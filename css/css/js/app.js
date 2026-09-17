async function loadDashboard() {

    const {
        data: employees,
        error: employeesError
    } =
        await supabaseClient
            .from("employees")
            .select("id, active");


    if (employeesError) {

        console.error(employeesError);

        return;
    }


    const {
        count: warningsCount
    } =
        await supabaseClient
            .from("warnings")
            .select("*", {
                count: "exact",
                head: true
            });


    const {
        count: deductionsCount
    } =
        await supabaseClient
            .from("deductions")
            .select("*", {
                count: "exact",
                head: true
            });


    const total =
        employees.length;


    const active =
        employees.filter(
            employee =>
                employee.active === true
        ).length;


    document.getElementById(
        "totalEmployees"
    ).textContent = total;


    document.getElementById(
        "activeEmployees"
    ).textContent = active;


    document.getElementById(
        "totalWarnings"
    ).textContent =
        warningsCount || 0;


    document.getElementById(
        "totalDeductions"
    ).textContent =
        deductionsCount || 0;
}


async function loadEmployees() {

    const {
        data,
        error
    } =
        await supabaseClient

            .from("employees")

            .select("*")

            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(error);

        return;
    }


    renderEmployees(data);
}


function renderEmployees(employees) {

    const container =
        document.getElementById(
            "employeesContainer"
        );


    container.innerHTML = "";


    employees.forEach(
        employee => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "employee-card";


            const photo =
                employee.photo_url ||
                "https://via.placeholder.com/500x400?text=Employee";


            card.innerHTML = `

                <img
                    class="employee-photo"
                    src="${photo}"
                    alt="${employee.name}"
                >

                <div class="employee-info">

                    <h3>
                        ${employee.name}
                    </h3>

                    <p>
                        الوظيفة:
                        ${employee.job_title || "-"}
                    </p>

                    <p>
                        الفرع:
                        ${employee.branch || "-"}
                    </p>

                    <p>
                        القسم:
                        ${employee.department || "-"}
                    </p>

                    <p>
                        الهاتف:
                        ${employee.phone || "-"}
                    </p>

                    <button
                        onclick="openEmployee('${employee.id}')"
                    >
                        عرض الملف
                    </button>

                </div>

            `;


            container.appendChild(card);

        }
    );
}


function openEmployee(employeeId) {

    alert(
        "صفحة الموظف سيتم بناؤها في الخطوة التالية."
    );
}
