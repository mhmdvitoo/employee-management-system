const loginPage =
    document.getElementById("loginPage");

const mainApp =
    document.getElementById("mainApp");

const loginBtn =
    document.getElementById("loginBtn");

const logoutBtn =
    document.getElementById("logoutBtn");

const loginMessage =
    document.getElementById("loginMessage");


async function login() {

    const email =
        document
            .getElementById("email")
            .value
            .trim();

    const password =
        document
            .getElementById("password")
            .value;


    if (!email || !password) {

        loginMessage.textContent =
            "من فضلك أدخل البريد وكلمة المرور.";

        return;
    }


    loginMessage.textContent =
        "جاري تسجيل الدخول...";


    const {
        data,
        error
    } =
        await supabaseClient.auth.signInWithPassword({

            email: email,

            password: password

        });


    if (error) {

        loginMessage.textContent =
            "بيانات الدخول غير صحيحة.";

        console.error(error);

        return;
    }


    const isAdmin =
        await checkAdmin();


    if (!isAdmin) {

        await supabaseClient.auth.signOut();

        loginMessage.textContent =
            "هذا الحساب ليس لديه صلاحية دخول.";

        return;
    }


    showApp();
}


async function checkAdmin() {

    const {
        data: {
            user
        }
    } =
        await supabaseClient.auth.getUser();


    if (!user) {

        return false;
    }


    const {
        data,
        error
    } =
        await supabaseClient

            .from("admins")

            .select("id, name, role, active")

            .eq("user_id", user.id)

            .eq("active", true)

            .maybeSingle();


    if (error) {

        console.error(error);

        return false;
    }


    return !!data;
}


function showApp() {

    loginPage.classList.add("hidden");

    mainApp.classList.remove("hidden");

    loadDashboard();

    loadEmployees();

    loadUsers();
}

function showLogin() {

    mainApp.classList.add("hidden");

    loginPage.classList.remove("hidden");
}


loginBtn.addEventListener(
    "click",
    login
);


logoutBtn.addEventListener(
    "click",
    async () => {

        await supabaseClient.auth.signOut();

        showLogin();

    }
);


supabaseClient.auth.onAuthStateChange(
    async (event, session) => {

        if (session) {

            const isAdmin =
                await checkAdmin();

            if (isAdmin) {

                showApp();

            } else {

                await supabaseClient.auth.signOut();

                showLogin();

            }

        } else {

            showLogin();

        }

    }
);
