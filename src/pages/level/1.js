import LayoutLevel from '../../components/LayoutLevel';

const level = 1;

const arr = [
    [],
    [],
    []
];

export default function One (){
    return (
        <LayoutLevel>
            {[1,
            'hello',
            arr]}
        </LayoutLevel>
    )
}