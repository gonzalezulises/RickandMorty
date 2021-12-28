type Props = {
    page:number|string,
    disabled?:boolean
    handle:Function,
    active?:boolean,
    show?:boolean,
}


export default function PaginationItem({disabled=false, handle, show=true, page, active} : Props) {
    return (
        <>
        {
            show && <li className={`page-item ${active?"active":""}  ${disabled?'disabled':''}`}><a className="page-link" href="#next" id="next" onClick={()=>handle()}>{page}</a></li>
        }
        </>
    )
}
