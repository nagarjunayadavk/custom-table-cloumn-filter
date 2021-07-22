import React, { Fragment, useState } from 'react'
import Filter from './Filter';

const DisplayTable = () => {
    const initialState = [{
        "title": "Brown eggs",
        "type": "dairy",
        "description": "Raw organic brown eggs in a basket",
        "rating": 4
    }, {
        "title": "Sweet fresh stawberry",
        "type": "fruit",
        "description": "Sweet fresh stawberry on the wooden table",
        "rating": 4
    }, {
        "title": "Asparagus",
        "type": "vegetable",
        "description": "Asparagus with ham on the wooden table",
        "rating": 3
    }, {
        "title": "Green smoothie",
        "type": "dairy",
        "description": "Glass of green smoothie with quail egg's yolk, served with cocktail tube, green apple and baby spinach leaves over tin surface.",
        "rating": 4
    }, {
        "title": "Raw legums",
        "type": "vegetable",
        "description": "Raw legums on the wooden table",
        "rating": 2
    }, {
        "title": "Baking cake",
        "type": "dairy",
        "description": "Baking cake in rural kitchen - dough  recipe ingredients (eggs, flour, sugar) on vintage wooden table from above.",
        "rating": 4
    }, {
        "title": "Pesto with basil",
        "type": "vegetable",
        "description": "Italian traditional pesto with basil, chesse and oil",
        "rating": 2
    }, {
        "title": "Hazelnut in black ceramic bowl",
        "type": "vegetable",
        "description": "Hazelnut in black ceramic bowl on old wooden background. forest wealth. rustic style. selective focus",
        "rating": 0
    }, {
        "title": "Green beans",
        "type": "vegetable",
        "description": "Raw organic green beans ready to eat",
        "rating": 1
    }, {
        "title": "Baked stuffed portabello mushrooms",
        "type": "bakery",
        "description": "Homemade baked stuffed portabello mushrooms with spinach and cheese",
        "rating": 1
    }, {
        "title": "Strawberry smoothie",
        "type": "fruit",
        "description": "Glass of red strawberry smoothie with chia seeds, served with retro cocktail tube, fresh mint and strawberries over dark background",
        "rating": 2
    }, {
        "title": "Vegan",
        "type": "vegan",
        "description": "Concept of healthy vegan eating",
        "rating": 5
    }, {
        "title": "Fresh blueberries",
        "type": "fruit",
        "description": "Healthy breakfast. berry crumble with fresh blueberries, raspberries, strawberries, almond, walnuts, pecans, yogurt, and mint in ceramic plates over white wooden surface, top view",
        "rating": 4
    }, {
        "title": "Smashed avocado",
        "type": "fruit",
        "description": "Vegan sandwiches with smashed avocado, tomatoes and radish. top view",
        "rating": 0
    }, {
        "title": "Italian ciabatta",
        "type": "bakery",
        "description": "Italian ciabatta bread cut in slices on wooden chopping board with herbs, garlic and olives over dark grunge backdrop, top view",
        "rating": 1
    }, {
        "title": "Rustic breakfast",
        "type": "dairy",
        "description": "Rustic healthy breakfast set. cooked buckwheat groats with milk and honey on dark grunge backdrop. top view, copy space",
        "rating": 0
    }, {
        "title": "Sliced lemons",
        "type": "fruit",
        "description": "Heap of whole and sliced lemons and limes with mint in vintage metal grid box over old wooden table with turquoise wooden background. dark rustic style.",
        "rating": 2
    }, {
        "title": "Plums",
        "type": "fruit",
        "description": "Yellow and red sweet plums",
        "rating": 1
    }, {
        "title": "French fries",
        "type": "bakery",
        "description": "Homemade oven baked french fries with ketchup",
        "rating": 3
    }, {
        "title": "Ground beef meat burger",
        "type": "meat",
        "description": "Raw ground beef meat burger steak cutlets with seasoning on vintage wooden boards, black background",
        "rating": 5
    }, {
        "title": "Basil",
        "type": "vegetable",
        "description": "Concept of vegan food with basil",
        "rating": 4
    }, {
        "title": "Peaches on branch",
        "type": "fruit",
        "description": "Peaches on branch with leaves and glasses with peach juice and limonade with ice cubes in aluminum tray over old metal table. dark rustic style. top view.",
        "rating": 3
    }]
    const [tableData, setTableData] = useState(initialState);
    const [filterStatus, setFilterStatus] = useState(false);
    const [filterValues, setFilterValues] = useState([]);
    const [filterCatageory, setFilterCatageory] = useState();
    const [filterPosition, setFilterPosition] = useState({});
    
    const enableFilter = (e, filedName) => {
        setFilterPositionValues(e);
        const setStatus = !filterStatus;
        setFilterStatus(setStatus);
        setFilterCatageory(filedName);
        if (setStatus) {
            const uniqueValues = [...new Set(tableData.map(item => item[filedName]))];
            const filteDataPrep = uniqueValues.map((filter, i) => {
                let filterObj = {};
                filterObj.id = i;
                filterObj.name = filter;
                filterObj.isChecked = false
                return filterObj
            })
            setFilterValues(filteDataPrep);
        }
    }

    const setFilterPositionValues = (e) =>{
        console.log(` e ------`, e)
        setFilterPosition({ 'transform': `translate3d(${e.clientX}px, ${e.clientY +10}px, 0px)` })
    }

    const handleFilterAppliedData = (value) => {
        setTableData(value === '' ? initialState : initialState.filter(item =>
            item[filterCatageory] === value));
    }

    return (
        <Fragment>
            {
                filterStatus ? <Filter filterdata={filterValues} filterPosition={filterPosition} handleFilterAppliedData={handleFilterAppliedData} /> : null
            }
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Title
                            <span className="material-icons" style={{ verticalAlign: 'middle' }} onClick={(e) => enableFilter( e, 'title')}>
                                filter_list
                            </span>
                        </th>
                        <th scope="col">Type
                            <span className="material-icons" style={{ verticalAlign: 'middle' }} onClick={(e) => enableFilter(e, 'type')} >
                                filter_list
                            </span>
                        </th>
                        <th scope="col">Rating
                            <span className="material-icons" style={{ verticalAlign: 'middle' }} onClick={(e) => enableFilter(e, 'rating')} >
                                filter_list
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((item, i) =>
                            <Fragment key={i}>
                                <tr>
                                    <td>{item.title}</td>
                                    <td>{item.type}</td>
                                    <td>{item.rating}</td>
                                </tr>
                            </Fragment>)
                    }
                </tbody>
            </table>
        </Fragment>
    )
}

export default DisplayTable;