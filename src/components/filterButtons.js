const FilterButton = (props) => {
    return (
        <>
            <button data-testid={props.name+"filter"} id={props.name} aria-pressed={props.name==props.currentFilter} onClick={()=>props.set_filter(props.name)}>
                {props.name}
            </button>
        </>
    );
}
 
export default FilterButton;