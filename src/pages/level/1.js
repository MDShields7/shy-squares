import Level from '../../components/layout/Level';

const level = 1;

const arr = [
    ['shy', 'shy', 'shy'],
    ['shy', 'shy', 'shy'],
    ['shy', 'shy', 'shy']
];

export default function One (){
    return (
        <Level>
            {[ 1, arr, 'link' ]}
        </Level>
    )
}