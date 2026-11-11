# PlanWise — Architecture & Urban Planning Calculator

A free, beginner-friendly web calculator for early-stage architecture and urban planning exercises. **No account, installation, or API key required.**

## Features

- **FSI / FAR:** counted floor area ÷ plot area.
- **Ground coverage:** footprint ÷ plot area × 100.
- **Land-use percentages:** editable categories and a visual percentage breakdown.
- **Parking estimate:** an illustrative, user-selected rate per 100 m².
- **Export:** download a plain-text calculation summary.
- **Responsive:** usable on phones and laptops.

## Run it

1. Download or clone this repository.
2. Open `index.html` in Chrome, Safari, Edge, or Firefox.
3. Change the example numbers to your project figures. Results update instantly.

There are no external dependencies. The app uses HTML, CSS, and JavaScript.

## Example

| Measure | Input | Result |
| --- | --- | --- |
| FSI | Plot 1,000 m², counted floor area 1,800 m² | 1.80 |
| Coverage | Plot 1,000 m², footprint 400 m² | 40% |
| Parking | Floor area 2,000 m², assumed 2 spaces / 100 m² | 40 spaces |

The sample land-use areas are illustrative educational data; they do not define legal zoning allocations.

## Test the calculations (optional)

With Node.js 18 or newer installed, run:

```bash
node --test tests/calculations.test.js
```

## Publish on GitHub (no coding experience needed)

1. Sign in to [GitHub](https://github.com) and create a **New repository** named `planwise-urban-planning-calculator`.
2. Set the visibility to **Public**. Do not add an automatic README, since this project already includes one.
3. Choose **uploading an existing file**, and upload the project files, including the `tests` folder. If the web interface cannot upload the folder, create `tests/calculations.test.js` directly in GitHub or use GitHub Desktop.
4. Commit the upload with a truthful message such as `Initial version of PlanWise calculator`.
5. Optional: In **Settings → Pages**, select **Deploy from a branch**, `main`, root `/` and save. GitHub Pages can then host the calculator.

### Repository description

`Open-source FSI/FAR, ground coverage, land-use and parking calculator for architecture and urban planning students.`

### Suggested topics

`urban-planning`, `architecture`, `fsi`, `far`, `land-use`, `calculator`, `javascript`, `education`

## Limitations

This is an **educational planning aid**, not a legal compliance checker. FSI exemptions, setbacks, permissible coverage, parking norms and development controls differ by jurisdiction and project. The parking rate is an assumption supplied by the user, not a prescribed standard. Consult official local regulations and qualified professionals for real submissions.

## Contributing

Ideas, bug reports, accessibility improvements, translations and new calculators are welcome. Open an issue describing the suggested change, or submit a pull request with a concise explanation and tests where practical.

## License

MIT — see [LICENSE](LICENSE).
