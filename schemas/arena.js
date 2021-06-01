import MonsterComponent from "../src/MonsterComponent";

export default {
    name: 'arena',
    title: 'Arena',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            type: 'object',
            inputComponent: MonsterComponent,
            name: 'aMonster',
            fields: [
                {
                    name: 'index',
                    title: 'Index',
                    type: 'string'
                }
            ]
        },
        
    ]
}