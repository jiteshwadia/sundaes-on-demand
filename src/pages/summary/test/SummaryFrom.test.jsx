import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("SummaryForm", () => {
	test("Initial conditions - checkbox is not checked, button is not enabled", () => {
		render(<SummaryForm />);
		const checkboxTnc = screen.getByRole("checkbox", {
			name: /terms and conditions/i,
		});
		expect(checkboxTnc).not.toBeChecked();

		const btnConfirmOrder = screen.getByRole("button", {
			name: /confirm order/i,
		});
		expect(btnConfirmOrder).toBeDisabled();
	});

	test("On checkbox checked, button will be enabled & vice-versa", async () => {
		const user = userEvent.setup();

		render(<SummaryForm />);
		const checkboxTnc = screen.getByRole("checkbox", {
			name: /terms and conditions/i,
		});
		const btnConfirmOrder = screen.getByRole("button", {
			name: /confirm order/i,
		});

		await user.click(checkboxTnc);
		expect(btnConfirmOrder).toBeEnabled();

		await user.click(checkboxTnc);
		expect(btnConfirmOrder).toBeDisabled();
	});

	test("Popover works properly", async () => {
		const user = userEvent.setup();
		render(<SummaryForm />);

		// popover component is hidden initially
		const hiddenPopover = screen.queryByText(
			/no ice cream will actually be delivered/i
		);
		expect(hiddenPopover).not.toBeInTheDocument();

		// on mouse hover popover component is visible
		const lblTnc = screen.getByText(/terms and conditions/i);
		await user.hover(lblTnc);
		const visiblePopover = screen.getByText(
			/no ice cream will actually be delivered/i
		);
		expect(visiblePopover).toBeInTheDocument();

		// on mouse un-hover popover component is hidden
		await user.unhover(lblTnc);
		expect(visiblePopover).not.toBeInTheDocument();
	});
});
