import Button from "../Button/Button"
import Pagination from "../Pagination/Pagination"
import { ObjectListContext } from "../../../App"
import './List.css'
import { useContext, useState } from "react"
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { isDragActive } from "motion/react"


export function TodoItem({ id, title, description }) {
    const [isEditing, setIsEditing] = useState(false);
    // Fix: Correctly destructure the context value - assuming it provides [objectList, setObjectList, editObject]
    const [objectList, setObjectList, editObject, deleteObject] = useContext(ObjectListContext);
    const [formData, setFormData] = useState({
        id: id,
        title: title,
        description: description
    });
    const hanleEditItem = () => {
      setIsEditing(!isEditing);
    }
     
    const handleSaveItem = () => {
        setIsEditing(false);
        // Now editObject should be properly accessed as a function
        editObject(formData.id, formData);
    }
    const handleDeleteItem = () => {
        deleteObject(formData.id);
    }

    // Fix the onChange handlers to properly update formData
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    return (
        <li className="list-item">
            {
                isEditing ? (
                    <input 
                        type="text" 
                        value={formData.title} 
                        onChange={(e) => handleInputChange('title', e.target.value)} 
                    />
                ) : <h3>{title}</h3>
            }
            {
                isEditing ? (
                    <textarea 
                        value={formData.description} 
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    ></textarea>
                ) : <p>{description}</p>
            }

            <span className="buttons">
                {
                isEditing ?
                <Button onClick={handleSaveItem}> <FaSave /> </Button>:
                <Button onClick={hanleEditItem}><FaEdit></FaEdit></Button>}


                <Button onClick={handleDeleteItem}><FaTrash></FaTrash></Button>
            </span>
        </li>
    )
}

export function List() {

    const [objectList, setObjectList, deleteObject] = useContext(ObjectListContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Set how many items you want per page

    // Calculate the items to display on current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = objectList.slice(indexOfFirstItem, indexOfLastItem);

   
    
    // Calculate total pages
    const totalPages = Math.ceil(objectList.length / itemsPerPage);

    return (
        <>
            <ul className="list">
                {currentItems.map((item) => {
                    return (
                        <TodoItem
                            id={item.id}
                            key={item.id}
                            title={item.title}
                            description={item.description}
                        ></TodoItem>
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
