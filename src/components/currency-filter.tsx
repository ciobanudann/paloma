import { FC } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

type Props = {
	value: string;
	onChange: (currency: string) => void;
	options: string[];
};
const CurrencyFilter: FC<Props> = ({ onChange, value, options }) => {
	return (
		<Select onValueChange={onChange} value={value}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Currency" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Currency</SelectLabel>
					{options.map((currency) => {
						return (
							<SelectItem key={currency} value={currency}>
								{currency}
							</SelectItem>
						);
					})}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default CurrencyFilter;
