import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("OrderSummary", () => {
	test("Initial State - checkbox is not checked, button is not enabled", () => {
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

		const btnConfirmOrder = screen.getByRole("button", {
			name: /confirm order/i,
		});
		const checkboxTnc = screen.getByRole("checkbox", {
			name: /terms and conditions/i,
		});

		await user.click(checkboxTnc);
		expect(checkboxTnc).toBeChecked();
		expect(btnConfirmOrder).toBeEnabled();

		await user.click(checkboxTnc);
		expect(checkboxTnc).not.toBeChecked();
		expect(btnConfirmOrder).toBeDisabled();
	});

	test("Popover works properly", async () => {
		const user = userEvent.setup();

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

		// on mouse unHover popover component gets hidden
		await user.unhover(lblTnc);
		expect(visiblePopover).not.toBeInTheDocument();
	});
});
