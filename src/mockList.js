import React from "react";



const mockList = [
    {
        name: 'A rodar mi vida',
        artist: 'Fito Paez',
        album: 'El amor despues del amor',
        id: 0
    },
    {
        name: 'El dia del amigo',
        artist: 'Catriel',
        album: 'Papota',
        id: 1
    },
    {
        name: 'Alta suciedad',
        artist: 'Andres Calamaro',
        album: 'Alta suciedad',
        id: 2
    },
    {
        name: 'Los dinosaurios',
        artist: 'Charly Garcia',
        album: 'clics modernos',
        id: 3
    },
    {
        name: 'Nos siguen pegando abajo',
        artist: 'Charly Garcia',
        album: 'clisc modernos',
        id: 4
    },
]

const new_list = [];

new_list.push("charly")

for(const i in mockList){
    for(const y in mockList[i]){
        new_list.push("charly")
    }    
}

/*for (const i in mockList){
    for (const y in i){
        if (mockList.i.y === 'Charly Garcia'){
            new_list.push("Charly Garcia")
        }     
    }
}*/

const new_string = 'test'

export default mockList