import IEpisodeFilter from '../Interfaces/IEpisodeFilter'
const APIURL = 'https://rickandmortyapi.com/api/episode'


const getAll = async (currentPage : number = 1, filters?:IEpisodeFilter) => { 

    let filterParams = "";
    filterParams += `${filters?.name && filters?.name.length>2 ? "&name="+filters.name:""}`;
    filterParams += `${filters?.episode && filters?.episode.length>2 ? "&episode="+filters.episode:""}`;
    
    const resp = await fetch(`${APIURL}/?page=${currentPage}${filterParams}`);
    return resp.json();
}

const get = async (id:any) => {
    const resp = await fetch(`${APIURL}/${id}`);
    return resp.json();
}

export  default{
    getAll,
    get
}