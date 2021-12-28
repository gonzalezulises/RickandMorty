import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import Character from "../Interfaces/ICharacter";
import IEpisode from "../Interfaces/IEpisode";
import ILocation from "../Interfaces/ILocation";

type ItemTypesString = "characters" | "episodes" | "locations";
type ItemType = Character | IEpisode | ILocation;
type ItemsType = {
    characters: Character[];
    episodes: IEpisode[];
    locations: ILocation[];
}
type favContextType = {
    episodes: IEpisode[],
    characters: Character[],
    locations: ILocation[],
    addItemToFav: (item : ItemType, type : ItemTypesString) => void;
    toggleItemFav: (item : ItemType, type : ItemTypesString) => boolean;
    itemInArray: (itemId:number, type : ItemTypesString) => boolean;

};
const favContextDefaultValues: favContextType = {
    characters:  [],
    episodes:  [],
    locations:  [],
    addItemToFav: ()=>{},
    toggleItemFav: () => { return false},
    itemInArray: () => { return false},
};

const FavContext = createContext<favContextType>(favContextDefaultValues);

export function useFavs() {
    return useContext(FavContext);
}

type Props = {
    children: ReactNode;
};

export function FavProvider({ children }: Props) {
    const [items, setItems] = useState<ItemsType>({
        characters: [],
        episodes: [],
        locations: [],
    });
    
    useEffect(() => {
        if(typeof window !== "undefined")
        setItems({
            characters: JSON.parse(localStorage.getItem("characters") || "[]"),
            episodes: JSON.parse(localStorage.getItem("episodes") || "[]"),
            locations: JSON.parse(localStorage.getItem("locations") || "[]")
        });
    }, [])

    const addItemToFav = (item:ItemType, type: ItemTypesString) => {
            const newItems = {
                ...items, 
                [type]: [...items[type], item]
            }
            setItems(newItems);
            localStorage.setItem(type,JSON.stringify([...items[type], item]));
    };

    const removeItemFromArray = (item:ItemType, type:ItemTypesString) => {
        let typeItemsFilter;
        if(type=="characters"){
            typeItemsFilter =  items.characters.filter(itemInArray => itemInArray.id != item.id)
        }else if(type=="episodes"){
            typeItemsFilter =  items.episodes.filter(itemInArray => itemInArray.id != item.id)
        }else if(type=="locations"){
            typeItemsFilter =  items.locations.filter(itemInArray => itemInArray.id != item.id)
        }
        setItems({
            ...items, 
            [type]: typeItemsFilter
        });
        localStorage.setItem(type,JSON.stringify([typeItemsFilter]));
    };

    const toggleItemFav = (item:ItemType,type:ItemTypesString) => {
        if(itemInArray(item.id, type)){
            removeItemFromArray(item, type);
            return false;
        }else{
            addItemToFav(item, type);
            return true;
        }
    }

    const itemInArray = (itemId:number, type:ItemTypesString) => {
        let typeItemsFilter = []
        if(type=="characters"){
            typeItemsFilter =  items.characters.filter(character => character.id === itemId)
        }else if(type=="episodes"){
            typeItemsFilter =  items.episodes.filter(episode => episode.id === itemId)
        }else if(type=="locations"){
            typeItemsFilter =  items.locations.filter(location => location.id === itemId)
        }
        return typeItemsFilter.length > 0;
    }

    const value = {
        episodes : items.episodes,
        characters : items.characters,
        locations : items.locations,
        addItemToFav,
        toggleItemFav,
        itemInArray
    };

    return (
        <>
            <FavContext.Provider value={value}>
                {children}
            </FavContext.Provider>
        </>
    );
}