import Button from "../Button/Button"
import Pagination from "../Pagination/Pagination"
import { ObjectListContext } from "../../../App"
import './List.css'
import { useContext, useState } from "react"

export function ListItem({ title, description, buttonText }) {
    return (
        <li className="list-item">
            <h3>{title}</h3>
            <p>{description}</p>
            <Button>{buttonText}</Button>
        </li>
    )
}

export function List() {
    const [objectList, setObjectList] = useContext(ObjectListContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Set how many items you want per page
    
    // Calculate the items to display on current page
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const indexOfLastItem = currentPage * itemsPerPage;
    const currentItems = objectList.slice(indexOfFirstItem, indexOfLastItem);


    
    // Calculate total pages
    const totalPages = Math.ceil(objectList.length / itemsPerPage);
    
    return (
        <>
            <ul className="list">
                {currentItems.map((item) => {
                    return (
                        <ListItem
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            buttonText={item.buttonText}
                        ></ListItem>
                    )
                })}
            </ul>
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage}
            />
        </>
    )
}
