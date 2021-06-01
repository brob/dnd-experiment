const axios = require('axios').default;
const apiBase = `https://www.dnd5eapi.co`
const fs = require('fs');

async function getSpells() {
    const spells = await axios.get('https://www.dnd5eapi.co/api/spells')
    const spellDetails = spells.data.results.map(spell => {
        return axios.get(`${apiBase}${spell.url}`)
            .then(res => {
                return res.data
            })
    })
    // console.log(spells.data.results)
    // const firstSpell = await axios.get(`${apiBase}${spells.data.results[0].url}`)
    return Promise.all(spellDetails)
        .then(values => {
            const sanityValues = values.map(value => {
                return {_id: value.index, _type: 'spell', ...value}
                
            })
            
            console.log(sanityValues)
            fs.writeFileSync('spells.json', JSON.stringify(sanityValues));

        })
}

getSpells()
// client
//     .withConfig({apiVersion: '2021-03-25'})