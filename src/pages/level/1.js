import Level from '../../components/layout/Level';

// const level = 1;
// const arr = [
//     ['shy', 'shy', 'shy'],
//     ['shy', 'shy', 'shy'],
//     ['shy', 'shy', 'shy']
// ];

const levelOneMap = new Map();

const key0 = [0,0]
const key1 = [0,1]
const key2 = [0,2]
const key3 = [1,0]
const key4 = [1,1]
const key5 = [1,2]
const key6 = [2,0]
const key7 = [2,1]
const key8 = [2,2]

levelOneMap.set(key0, 'shy')
levelOneMap.set(key1, 'shy')
levelOneMap.set(key2, 'bold')
levelOneMap.set(key3, 'shy')
levelOneMap.set(key4, 'bold')
levelOneMap.set(key5, 'lava')
levelOneMap.set(key6, 'shy')
levelOneMap.set(key7, 'bold')
levelOneMap.set(key8, 'shy')

// console.log('levelOneMap',levelOneMap)

export default function One (){
    return (
        <Level>
            {[ 1, levelOneMap, 1.8, 'link' ]}
        </Level>
    )
}