import Level from '../../components/layout/Level';

// const level = 1;
// const arr = [
//     ['shy', 'shy', 'shy'],
//     ['shy', 'shy', 'shy'],
//     ['shy', 'shy', 'shy']
// ];

const levelOneMap = new Map();

levelOneMap.set([0,0], 'shy')
levelOneMap.set([0,1], 'shy')
levelOneMap.set([0,2], 'shy')
levelOneMap.set([1,0], 'shy')
levelOneMap.set([1,1], 'shy')
levelOneMap.set([1,2], 'shy')
levelOneMap.set([2,0], 'shy')
levelOneMap.set([2,1], 'shy')
levelOneMap.set([2,2], 'shy')

console.log('levelOneMap',levelOneMap)

export default function One (){
    return (
        <Level>
            {[ 1, levelOneMap, 'link' ]}
        </Level>
    )
}