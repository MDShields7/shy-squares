// square data shapes


{   name: 'lava'
    hover: ['end']
    click: ['end']  }
{   name: 'shy-2x' 
    hover: ['flip', 'flip', 'done']
    click: ['na', 'na', 'done'] }
{   name: 'shy' 
    hover: ['flip', 'done']
    click: ['na', 'done']   }
{   name: 'shy-lava' 
    hover: ['flip', 'end']
    click: ['na', 'end']    }
{   name: 'bold-2x'
    hover: ['na', 'na', 'done']
    click: ['demo', 'demo', 'done'] }
{   name: 'bold'
    hover: ['na', 'done']
    click: ['demo', 'done'] }
{   name: 'calm'
    hover: ['done']
    click: ['done'] }

// Name property is unused by data, just human readable

// Squares may reach completion ('done')
// 1 Through hover effect flipping them  
// 2 Through click effect demolishing them 

// When all squares are flipped, the round is won
// Get points by completing the round by a certain time (par)

// A round may also be lost if certain squares are activated ('end')
// by hover or click effects