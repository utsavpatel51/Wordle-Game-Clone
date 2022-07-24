const Block = function (props) {
	return (
		<div className={`block ${props?.status} ${props?.cls}`}>
			{props.text ?? ""}
		</div>
	);
};

export default Block;
