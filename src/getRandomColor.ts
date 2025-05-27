const colors = [
        'red',
        'green',
        'blue',
        'pink',
        'orange',
        'cyan',
        'turquoise',
        'purple',
        'brown',
        'yellow'
    ]
    
export const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]