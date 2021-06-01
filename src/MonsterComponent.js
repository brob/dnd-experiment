
import React, {useState, useEffect} from 'react'

// Helper component for building default inputs
import { FormBuilderInput } from '@sanity/form-builder/lib/FormBuilderInput'
// Helper component for managing fieldsets
import Fieldset from 'part:@sanity/components/fieldsets/default'
// Utilities for patching
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'
import {Card, Box, Code, Avatar, Autocomplete, Flex, Text} from '@sanity/ui'

const MonsterComponent = React.forwardRef((props, ref) => {
  // destructure props for easier use
  const {
    compareValue,
    focusPath,
    markers,
    onBlur,
    onChange,
    onFocus,
    presence,
    type,
    value,
    level
  } = props
  const firstFieldInput = React.createRef()
  const [monsters, setMonsters] = useState([])
  
  useEffect(() => {
    getMonsters()
  }, [])

  // const handleFieldChange = React.useCallback(
  //   (field, fieldPatchEvent) => {
  //     // fieldPatchEvent is an array of patches
  //     // Patches look like this:
  //     /*
  //         {
  //             type: "set|unset|setIfMissing",
  //             path: ["fieldName"], // An array of fields
  //             value: "Some value" // a value to change to
  //         }
  //     */

  //       },
  //   [onChange]
  // )

  // Get an array of field names for use in a few instances in the code
  const fieldNames = type.fields.map((f) => f.name)
  // If Presence exist, get the presence as an array for the children of this field
  const childPresence =
    presence.length === 0
      ? presence
      : presence.filter((item) => fieldNames.includes(item.path[0]))

  // If Markers exist, get the markers as an array for the children of this field
  const childMarkers =
    markers.length === 0
      ? markers
      : markers.filter((item) => fieldNames.includes(item.path[0]))



    async function getMonsters() {
      const monsters = await (await fetch('https://www.dnd5eapi.co/api/monsters')).json()
      const options = monsters.results.map(monster => {
        return {
          value: monster.index,
          payload: monster
        }
      })
      
      setMonsters(options)      
    }
    async function monsterDetails(value) {
      console.log({value})
      const monster = await getMonsterDetails(value)
      console.log(monster)
      console.log({props})
      const patch = PatchEvent.from({
        value: monster,
        _key: props.value?._key  || Math.random().toString().replace('.', ''),
        path: ['aMonster'],
        type: monster ? 'set' : 'unset'
      })
      console.log(patch)
      onChange(patch)

    }
    async function getMonsterDetails(index) {
      return (await fetch(`https://www.dnd5eapi.co/api/monsters/${index}`)).json()
    }
    const renderOption = (option) => {
      return <Card as="button">
      <Flex align="center">
        <Box flex={1} padding={3}>
          <Text size={[2, 2, 3]}>
          {option.payload.name}
          </Text>
        </Box>
      </Flex>
    </Card>
    }
  return (
    <Fieldset
      level={level}
      legend={type.title + ' formbuilder test'}
      description={type.description}
      isCollapsible={!!type.options && !!type.options.collapsible}
      isCollapsed={!!type.options && !!type.options.collapsed}
      markers={childMarkers} // markers built above
      presence={childPresence}
    >

<Card padding={[3, 3, 4]} paddingBottom={[8, 8, 9]}>
  <Autocomplete
    // custom search filter
    filterOption={(query, option) =>
      option.payload.name
        .toLowerCase()
        .indexOf(query.toLowerCase()) > -1
    }
    fontSize={[2, 2, 3]}
    openButton
    // options with `payload`
    options={monsters}
    padding={[3, 3, 4]}
    placeholder="Type to find user …"
    // custom option render function
    renderOption={renderOption}
    // custom value render function
    renderValue={(value, option) => {
      console.log(props.value)
      return option?.payload.name || props.value.aMonster.name
    }}
    onSelect={monsterDetails}
  />
  <Code>
    {JSON.stringify(props.value, null, 2)}
  </Code>
</Card>

      {type.fields.map((field, i) => {
        const fieldMarkers = markers.filter(marker => marker.path.includes(field.name))

        return (
          // Delegate to the generic FormBuilderInput. It will resolve and insert the actual input component
          // for the given field type
          <FormBuilderInput
            level={level + 1}
            ref={i === 0 ? firstFieldInput : null}
            key={field.name}
            type={field.type}
            value={value && value[field.name]}
            onChange={(patchEvent) => handleFieldChange(field, patchEvent)}
            path={[field.name]}
            markers={fieldMarkers}
            focusPath={focusPath}
            readOnly={field.readOnly}
            presence={presence}
            onFocus={onFocus}
            onBlur={onBlur}
            compareValue={compareValue}
          />
        )
      })}
    </Fieldset>
  )
}
)

export default MonsterComponent
