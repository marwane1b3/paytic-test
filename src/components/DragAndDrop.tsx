import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DragedItem from './DragedItem';
import '../assets/styles/styles.css';

const DragAndDrop = () => {

    const [categories, setCategories] = useState([
        { id: 1, name: 'Catergory 1' },
        { id: 2, name: 'Category 2' },
    ]);
    const [clicked, setClicked] = useState(false)
    const [items, setItems] = useState([
        { id: 1, name: 'item1', category: 1 },
        { id: 2, name: 'item2', category: 1 },
        { id: 3, name: 'item3', category: 1 },
        { id: 4, name: 'item4', category: 2 },
        { id: 5, name: 'item5', category: 2 },
        { id: 6, name: 'item6', category: 2 },
    ]);
    const handleSaveButtonFuncion = () => {
        setClicked((prev: Boolean) => !prev)
    }
    const reorderArrayFunction = (arr: any, sourceIndex: number, destIndex: number) => {
        const arrCopy = [...arr];
        const [removed] = arrCopy.splice(sourceIndex, 1);
        arrCopy.splice(destIndex, 0, removed);

        return arrCopy;
    };

    const onDragEndFunction = (result: any) => {
        console.log(result);
        setClicked(false)
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === 'Categories') {
            setCategories(reorderArrayFunction(categories, source.index, destination.index));
        } else if (destination.droppableId !== source.droppableId) {
            setItems((items) =>
                items.map((item) =>
                    item.id === parseInt(result.draggableId)
                        ? {
                            ...item,
                            category: parseInt(result.destination.droppableId),
                        }
                        : item
                )
            );
        } else {

            setItems(reorderArrayFunction(items, source.index, destination.index));
        }
    };

    return (
        <div className="container py-5">
            <DragDropContext onDragEnd={onDragEndFunction}>
                <div>
                    <Droppable droppableId="Categories" type="droppableItem">
                        {(provided) => (
                            <div className="row d-flex d-m-block space-between" ref={provided.innerRef}>
                                {categories.map((category, index) => (
                                    <div className="col-md-6 col-sm-12">
                                        <Draggable
                                            draggableId={`category-${category.id}`}
                                            key={`category-${category.id}`}
                                            index={index}
                                        >
                                            {(parentProvider) => (
                                                <div
                                                    ref={parentProvider.innerRef}
                                                    {...parentProvider.draggableProps}
                                                >
                                                    <Droppable droppableId={category.id.toString()}>
                                                        {(provided) => (
                                                            <div ref={provided.innerRef}>
                                                                <ul className="list-unstyled  border p-3 mb-3">
                                                                    <h6
                                                                        className="h6 mb-3"
                                                                        {...parentProvider.dragHandleProps}
                                                                    >
                                                                        {category.name}
                                                                    </h6>
                                                                    {items
                                                                        .filter(
                                                                            (item) => item.category === category.id
                                                                        )
                                                                        .map((item: any, index: number) => (
                                                                            <Draggable
                                                                                draggableId={item.id.toString()}
                                                                                key={item.id}
                                                                                index={index}
                                                                            >
                                                                                {(provided) => (
                                                                                    <div
                                                                                        ref={provided.innerRef}
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                    >
                                                                                        <li className="mb-3 d-flex align-items-center justify-content-between border p-3">
                                                                                            <DragedItem {...item} />
                                                                                            <button className="btn btn-primary">
                                                                                                ...
                                                                                        </button>
                                                                                        </li>
                                                                                    </div>
                                                                                )}
                                                                            </Draggable>
                                                                        ))}
                                                                    {provided.placeholder}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </Droppable>
                                                </div>
                                            )}
                                        </Draggable>
                                    </div>
                                ))}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
            <div className="d-flex  m-4 justify-content-center">

                <button onClick={handleSaveButtonFuncion} className="btn btn-primary px-5 mt-1">
                    Save
                </button>


            </div>
            <div className="d-flex m-4 justify-content-center">


                {clicked === true && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan={2} className="text-center">Right category values</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.filter((el: any) => el.category === 2).map((ul: any) => {
                                    return (
                                        <tr>
                                            <td className=" text-center">
                                                {ul.name}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )
                }



            </div>
        </div>
    );
}
export default DragAndDrop