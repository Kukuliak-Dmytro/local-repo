import Button from "../Button/Button"
import './List.css'
export function ListItem({ title, description, buttonText, key }) {
    return (
        <li key={key} className="list-item">
            <h3>{title}</h3>
            <p>{description}</p>
            <Button>{buttonText}</Button>
        </li>
    )
}
export function List({objectList}) {
    console.log("List component rendered with objectList:", objectList);
    return (
        <ul className="list">
            {objectList.map((item) => {
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
    )
}

function TestFunction(){}
const testFunction = ()=>{}
()=>{}