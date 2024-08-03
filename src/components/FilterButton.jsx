function FilterButton(props) {
    let buttonText;
    if (props.name === "All") {
        buttonText = "すべて";
    } else if (props.name === "Active") {
        buttonText = "未完了";
    } else {
        buttonText = "完了";
    }

    return (
        <button
            type="button"
            className="btn toggle-btn"
            aria-pressed={props.isPressed}
            onClick={() => props.setFilter(props.name)}>
            <span>{buttonText}</span>
            <span className="visually-hidden">のタスク</span>
        </button>
    );
}

export default FilterButton;