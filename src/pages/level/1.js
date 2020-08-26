import Level from '../../components/layout/Level';

const level = 1;

const arr = [
    [],
    [],
    []
];

export default function One (){
    return (
        <Level>
            {[1,
            'hello',
            arr
            ]}
        </Level>
    )
}