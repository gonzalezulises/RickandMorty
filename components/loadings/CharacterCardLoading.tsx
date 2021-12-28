import { Row, Col, Form } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CharacterCardLoading() {
    return (
        <div className='d-flex mb-3'>
            <Skeleton height={150} width={150}/>
            <div className='flex-grow-1 py-2 px-3'>
                <Skeleton height={20} width={250}/>
                <Skeleton height={15} width={150} className='mb-3'/>
                <Skeleton height={40} width={150} className='mb-2'/>
                <Skeleton height={20} width={20}/>
            </div>
        </div>
    )
}
