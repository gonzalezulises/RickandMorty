import PaginationItem from './PaginationItem'

type Props = {
    currentPage: number,
    pagesCount: number,
    handleChangePage:Function,
    disabled:boolean
}

export default function Pagination({currentPage, pagesCount, handleChangePage, disabled} : Props) {
    const nextPage = () =>{
        handleChangePage(currentPage+1);
    }
    const prevPage = () =>{
        const prevPage : number = ( currentPage > 1 ? currentPage-1 : 1);
        handleChangePage(prevPage);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <PaginationItem disabled={disabled} show={currentPage>1} handle={prevPage} page={"Anterior"}/>
                <PaginationItem disabled={disabled} show={currentPage-2 > 0} handle={()=>handleChangePage(currentPage-2)} page={currentPage-2}/>
                <PaginationItem disabled={disabled} show={currentPage-1 > 0} handle={prevPage} page={currentPage-1}/>
                <PaginationItem active page={currentPage} handle={()=>handleChangePage(currentPage)} />
                <PaginationItem disabled={disabled} show={pagesCount > currentPage} handle={nextPage} page={currentPage+1}/>
                <PaginationItem disabled={disabled} show={pagesCount > currentPage+1} handle={()=>handleChangePage(currentPage+2)} page={currentPage+2}/>
                <PaginationItem disabled={disabled} show={pagesCount > currentPage} handle={nextPage} page={"siguiente"}/>
            </ul>
        </nav>

    )
}
