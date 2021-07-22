import React, { Fragment, useState } from 'react'
const Filter = ({ filterdata, filterPosition, handleFilterAppliedData }) => {
    // const [filterList, setFilterList] = useState([
    //     { id: 1, name: "Checkbox 1", isChecked: false },
    //     { id: 2, name: "Checkbox 2", isChecked: false },
    //     { id: 3, name: "Checkbox 3", isChecked: false }
    // ]);

    const [filterList, setFilterList] = useState(filterdata);
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const [selectedFilterList, setSelectedFilterList] = useState(); //useState([]);
    const onItemClick = (item) => {
        const isCheckedVal = item.target.checked;
        const value = item.target.value;
        const selectedFilter = filterList.find(x => {
            return isNaN(x.name) ? x.name === value : x.name === parseInt(value)
        });
        selectedFilter.isChecked = isCheckedVal
        setFilterList(filterList.map(item =>
            item.name === value
                ? { ...item, isChecked: isCheckedVal }
                : item));
        const checkIsAnyCheckboxActive = filterList.filter(x => x.isChecked === true);
        if (checkIsAnyCheckboxActive.length === 0) {
            setIsBtnDisabled(true);
        } else {
            setIsBtnDisabled(false);
        }

        if (isCheckedVal) {
            setSelectedFilterList(value)
        }
        else {
            setSelectedFilterList('');
        }
        handleFilterAppliedData(isCheckedVal ? (isNaN(value) ? value : parseInt(value)) : '')
    }
    const clearAllCheckBoxes = () => {
        setFilterList(filterList.map(item => item.isChecked === true ? { ...item, isChecked: false } : item));
        setIsBtnDisabled(true);
        handleFilterAppliedData('')
    }
    return (
        <Fragment>
            <div className="filter" style={filterPosition}>
                <div className="filter-inner">
                    {
                        filterList.length > 0 ?
                            <Fragment>
                                <ul className="list-inline">
                                    {
                                        filterList.map((filterItem, i) =>
                                            <Fragment key={filterItem.id}>

                                                <li className="">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id={"filter-checkbox-" + i}
                                                            value={filterItem.name} checked={filterList[i].isChecked} onChange={onItemClick} />
                                                        <label className="form-check-label" htmlFor={"filter-checkbox-" + i}>
                                                            {filterItem.name}
                                                        </label>
                                                    </div>
                                                    {/* <label className="checkbox-checked">
                                                    <input type="checkbox" value={filterItem.name} checked={filterList[i].isChecked} onChange={onItemClick} />
                                                    <span className="label-text">{filterItem.name}</span>
                                                </label> */}
                                                </li>
                                            </Fragment>

                                        )
                                    }
                                </ul>
                            </Fragment>
                            : null
                    }
                    <div>
                        <button className="btn btn-outline-secondary" disabled={isBtnDisabled} onClick={clearAllCheckBoxes}>
                            <span className="material-icons" style={{ verticalAlign: 'text-top' }}>
                                clear
                            </span>
                            Clear All</button>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default Filter;