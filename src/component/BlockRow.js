import Block from "./Block";
import "../assets/scss/block.scss";

function BlockRow({ value, current_value, fix_value }) {
	if (value) {
		return (
			<div className="block-row__past">
				{value.map((block, index) => (
					<Block key={index} text={block.key} status={block.status} />
				))}
			</div>
		);
	} else if (current_value) {
		return (
			<div className="block-row__current">
				{[...current_value].map((block, index) => (
					<Block key={index} text={block} cls="filled" />
				))}
				{[...Array(4 - current_value.length)].map((_, index) => (
					<Block key={index} />
				))}
			</div>
		);
	} else if (fix_value) {
		return (
			<div className="block-row__current">
				{[...fix_value].map((block, index) => (
					<Block key={index} text={block} cls="filled" />
				))}
			</div>
		);
	} else {
		return (
			<div className="block-row">
				<Block />
				<Block />
				<Block />
				<Block />
			</div>
		);
	}
}

export default BlockRow;
