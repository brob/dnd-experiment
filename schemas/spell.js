export default {
    name: 'spell',
    title: 'Spell',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'desc',
            title: 'Description',
            type: 'array',
            of: [
                {type: 'text'}
            ]
        },
        {
            name: 'material',
            title: 'Material',
            type: 'text'
        },
        {
            name: 'area_of_effect',
            title: 'Area of Effect',
            type: 'object',
            fields: [
                {
                    name: 'size',
                    title: 'Size',
                    type: 'number'
                },
                {
                    name: 'type',
                    title: 'Type',
                    type: 'string'
                }
            ]
        },
        {
            name: 'casting_time',
            title: 'Casting Time',
            type: 'string'
        },
        {
            title: 'Components',
            name: 'components',
            type: 'array',
            of: [
                {type: 'string'},
            ],
        },
        {
            title: 'Concentration?',
            name: 'concentration',
            type: 'boolean',
        },
        {
            name: 'duration',
            title: 'Duration',
            type: 'string'
        },
        {
            name: 'level',
            title: 'Level',
            type: 'number'
        },
        {
            name: 'ritual',
            title: 'Ritual?',
            type: 'boolean'
        },
        {
            name: 'range',
            title: 'Range',
            type: 'string'
        },
        {
            name: 'school',
            title: 'School',
            type: 'object',
            fields: [
                {
                    name: 'index',
                    title: 'Index',
                    type: 'string'
                },
                {
                    name: 'name',
                    title: 'Name',
                    type: 'string'
                },
                {
                    name: 'url',
                    title: 'URL',
                    type: 'string'
                }
            ]
        },
        {
            title: 'Classes',
            name: 'classes',
            type: 'array',
            of: [
                {type: 'object',
                fields: [
                    {
                        name: 'index',
                        title: 'Index',
                        type: 'string'
                    },
                    {
                        name: 'name',
                        title: 'Name',
                        type: 'string'
                    },
                    {
                        name: 'url',
                        title: 'URL',
                        type: 'string'
                    }
                ]
            },
            ],
        },
        

    ]
}