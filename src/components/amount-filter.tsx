import { FC } from "react";
import { Input } from "./ui/input";

type Props = {
	value: [number, number];
	defaultValue: { min: number; max: number };
	onChange: (value: [number, number]) => void;
};
const AmountFilter: FC<Props> = ({ value, defaultValue, onChange }) => {
	const [minValue, maxValue] = value;
	const { min: minDefault, max: maxDefault } = defaultValue;

	const max = maxValue || maxDefault;
	const min = minValue || minDefault;

	return (
		<div className="flex items-center gap-1">
			Amount:
			<Input
				value={min}
				className="w-20"
				onChange={(e) => {
					onChange([Number(e.target.value), Number(max)]);
				}}
			/>
			<Input
				className="w-20"
				value={max}
				onChange={(e) => {
					onChange([Number(min), Number(e.target.value)]);
				}}
			/>
		</div>
	);
};

export default AmountFilter;
