const form = document.getElementById("bmiForm");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const calculateButton = document.getElementById("calculateButton");

const CDC_BMI_URL =
    "https://www.cdc.gov/growthcharts/data/zscore/bmiagerev.csv";

let cdcData = [];

async function loadCDCData() {
    try {
        const response = await fetch(CDC_BMI_URL);

        if (!response.ok) {
            throw new Error("Unable to download CDC data.");
        }

        const csv = await response.text();

        cdcData = parseCSV(csv);

        if (cdcData.length === 0) {
            throw new Error("CDC dataset is empty.");
        }

        loading.style.display = "none";
        calculateButton.disabled = false;

    } catch (error) {
        loading.textContent =
            "Could not load CDC data. Please use a local server.";
        loading.style.color = "#d93025";
        calculateButton.disabled = true;
        console.error(error);
    }
}

function parseCSV(csv) {
    const lines = csv
        .trim()
        .split(/\r?\n/)
        .filter(line => line.trim() !== "");

    const headers = lines[0]
        .split(",")
        .map(header => header.trim());

    return lines.slice(1).map(line => {
        const values = line.split(",");

        const row = {};

        headers.forEach((header, index) => {
            row[header] = values[index]
                ? values[index].trim()
                : "";
        });

        return row;
    });
}

function calculateBMI(height, weight) {
    const meters = height / 100;
    return weight / (meters * meters);
}

function getAgeInMonths(age) {
    return Math.round(age * 12);
}

function findCDCRow(ageMonths, sex) {
    const targetAge = ageMonths + 0.5;

    return cdcData.find(row => {
        const rowSex = Number(row["Sex"]);
        const rowAge = Number(row["Agemos"]);

        return (
            rowSex === Number(sex) &&
            rowAge === targetAge
        );
    });
}

function normalCDF(z) {
    const sign = z < 0 ? -1 : 1;
    z = Math.abs(z);

    const t = 1 / (1 + 0.2316419 * z);

    const d =
        0.3989422804014327 *
        Math.exp(-z * z / 2);

    const probability =
        d *
        t *
        (
            0.319381530 +
            t *
            (
                -0.356563782 +
                t *
                (
                    1.781477937 +
                    t *
                    (
                        -1.821255978 +
                        t * 1.330274429
                    )
                )
            )
        );

    return sign === 1
        ? 1 - probability
        : probability;
}

function calculateZScore(bmi, row) {
    const L = Number(row["L"]);
    const M = Number(row["M"]);
    const S = Number(row["S"]);

    if (!Number.isFinite(L) ||
        !Number.isFinite(M) ||
        !Number.isFinite(S)) {
        return null;
    }

    if (L === 0) {
        return Math.log(bmi / M) / S;
    }

    return (
        Math.pow(bmi / M, L) - 1
    ) / (L * S);
}

function calculatePercentile(bmi, row) {
    const z = calculateZScore(bmi, row);

    if (z === null) {
        return null;
    }

    let percentile = normalCDF(z) * 100;

    percentile = Math.max(
        0.01,
        Math.min(99.99, percentile)
    );

    return percentile;
}

function getCategory(percentile) {
    if (percentile < 5) {
        return "Underweight";
    }

    if (percentile < 85) {
        return "Healthy Weight";
    }

    if (percentile < 95) {
        return "Overweight";
    }

    return "Obesity";
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const age = Number(
        document.getElementById("age").value
    );

    const sex =
        document.getElementById("sex").value;

    const height = Number(
        document.getElementById("height").value
    );

    const weight = Number(
        document.getElementById("weight").value
    );

    if (
        !Number.isFinite(age) ||
        age < 2 ||
        age > 20 ||
        !sex ||
        !Number.isFinite(height) ||
        height <= 0 ||
        !Number.isFinite(weight) ||
        weight <= 0
    ) {
        showError("Please enter valid information.");
        return;
    }

    const bmi = calculateBMI(height, weight);

    const ageMonths = getAgeInMonths(age);

    const row = findCDCRow(ageMonths, sex);

    if (!row) {
        showError(
            "CDC data for this age could not be found."
        );
        return;
    }

    const percentile = calculatePercentile(
        bmi,
        row
    );

    if (percentile === null) {
        showError(
            "Could not calculate BMI percentile."
        );
        return;
    }

    const category = getCategory(percentile);

    result.className = "";
    result.style.display = "block";

    result.innerHTML = `
        <div class="result-title">
            Your BMI
        </div>

        <div class="bmi-value">
            ${bmi.toFixed(1)}
        </div>

        <div class="percentile">
            BMI-for-age: ${percentile.toFixed(1)}th percentile
        </div>

        <div class="category">
            Category: ${category}
        </div>

        <div class="note">
            This result uses CDC BMI-for-age reference
            data for children and adolescents.
            BMI-for-age should not be used as the sole
            basis for a medical diagnosis.
        </div>
    `;
});

function showError(message) {
    result.style.display = "block";
    result.className = "error";

    result.innerHTML = `
        <strong>${message}</strong>
    `;
}

calculateButton.disabled = true;

loadCDCData();