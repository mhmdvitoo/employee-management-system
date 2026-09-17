const userModal =
    document.getElementById(
        "userModal"
    );

const addUserBtn =
    document.getElementById(
        "addUserBtn"
    );

const closeUserBtn =
    document.getElementById(
        "closeUserBtn"
    );

const saveUserBtn =
    document.getElementById(
        "saveUserBtn"
    );

const userEmployee =
    document.getElementById(
        "userEmployee"
    );

const userEmail =
    document.getElementById(
        "userEmail"
    );

const userPassword =
    document.getElementById(
        "userPassword"
    );

const userRole =
    document.getElementById(
        "userRole"
    );

const userMessage =
    document.getElementById(
        "userMessage"
    );


addUserBtn.addEventListener(
    "click",
    async () => {

        userModal.classList.remove(
            "hidden"
        );

        userMessage.textContent = "";

        await loadAvailableEmployees();

    }
);


closeUserBtn.addEventListener(
    "click",
    () => {

        userModal.classList.add(
            "hidden"
        );

    }
);


async function loadAvailableEmployees() {

    userEmployee.innerHTML = `
        <option value="">
            جاري تحميل الموظفين...
        </option>
    `;


    const {
        data,
        error
    } =
        await supabaseClient

            .from("employees")

            .select(
                "id, name, email"
            )

            .eq(
                "active",
                true
            )

            .order(
                "name"
            );


    if (error) {

        console.error(error);

        userEmployee.innerHTML = `
            <option value="">
                حدث خطأ
            </option>
        `;

        return;
    }


    userEmployee.innerHTML = `
        <option value="">
            اختر الموظف
        </option>
    `;


    data.forEach(
        employee => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                employee.id;


            option.textContent =
                employee.name;


            option.dataset.email =
                employee.email || "";


            userEmployee.appendChild(
                option
            );

        }
    );

}


userEmployee.addEventListener(
    "change",
    () => {

        const option =
            userEmployee.options[
                userEmployee.selectedIndex
            ];


        if (
            option &&
            option.dataset.email
        ) {

            userEmail.value =
                option.dataset.email;

        }

    }
);


saveUserBtn.addEventListener(
    "click",
    createUser
);


async function createUser() {

    const employee_id =
        userEmployee.value;

    const email =
        userEmail.value.trim();

    const password =
        userPassword.value;

    const role =
        userRole.value;


    if (!employee_id) {

        userMessage.textContent =
            "اختر الموظف أولًا.";

        return;
    }


    if (!email) {

        userMessage.textContent =
            "أدخل البريد الإلكتروني.";

        return;
    }


    if (
        !password ||
        password.length < 6
    ) {

        userMessage.textContent =
            "كلمة المرور يجب أن تكون 6 أحرف على الأقل.";

        return;
    }


    userMessage.textContent =
        "جاري إنشاء المستخدم...";


    saveUserBtn.disabled =
        true;


    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .functions
                .invoke(
                    "create-user",
                    {
                        body: {

                            employee_id:
                                employee_id,

                            email:
                                email,

                            password:
                                password,

                            role:
                                role

                        }
                    }
                );


        if (error) {

            console.error(error);

            userMessage.textContent =
                error.message ||
                "حدث خطأ أثناء إنشاء المستخدم.";

            return;
        }


        if (
            data &&
            data.error
        ) {

            userMessage.textContent =
                data.error;

            return;
        }


        userMessage.textContent =
            "تم إنشاء المستخدم بنجاح.";


        setTimeout(
            () => {

                userModal.classList.add(
                    "hidden"
                );

                loadUsers();

            },
            1000
        );

    }

    catch (error) {

        console.error(error);

        userMessage.textContent =
            "حدث خطأ غير متوقع.";

    }

    finally {

        saveUserBtn.disabled =
            false;

    }

}
