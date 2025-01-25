let notificationsEnabled = false; // متغير لحفظ حالة الإشعارات

// دالة تفعيل أو تعطيل الإشعارات
function toggleNotifications() {
    // إذا كانت الإشعارات مفعلة بالفعل
    if (notificationsEnabled) {
        notificationsEnabled = false;
        showPopUp("تم تعطيل الإشعارات", "error"); // عرض رسالة Pop-up لتأكيد تعطيل الإشعارات
    } else {
        // طلب إذن للإشعارات
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                notificationsEnabled = true;
                showPopUp("تم تمكين الإشعارات بنجاح", "success"); // عرض رسالة Pop-up لتأكيد تفعيل الإشعارات

                // إرسال إشعار تلقائي عند تفعيل الإشعارات
                const notification = new Notification('إشعار جديد', {
                    body: "تم تمكين الإشعارات بنجاح. اضغط لفتح المزيد.",
                    icon: "https://cdn-icons-png.flaticon.com/512/4762/4762311.png",  // يمكنك استبدال الأيقونة
                    timestamp: new Date().toLocaleString() // إضافة الوقت للإشعار
                });

                // إضافة حدث عند النقر على الإشعار
                notification.onclick = function () {
                    window.open("https://mohammed-alaa-mohammed.github.io/Portfolio/", "_blank"); // فتح رابط عند النقر على الإشعار
                };
            } else {
                showPopUp("تم رفض الإذن بالإشعارات.", "warning"); // عرض رسالة Pop-up لرفض الإذن
            }
        }).catch((error) => {
            console.error("حدث خطأ أثناء طلب الإذن:", error);
            showPopUp("حدث خطأ أثناء طلب الإشعار.", "error"); // عرض رسالة Pop-up عند حدوث خطأ
        });
    }
}

// دالة لعرض الرسائل المنبثقة (Pop-up)
function showPopUp(message, type) {
    let color = "#28a745"; // اللون الافتراضي (نجاح)

    if (type === "error") {
        color = "#dc3545"; // اللون عند حدوث خطأ
    } else if (type === "warning") {
        color = "#ffc107"; // اللون عند التحذير
    }

    Toastify({
        text: message,
        duration: 3000, // مدة ظهور الرسالة 3 ثوانٍ
        gravity: "top", // تحديد مكان ظهور الرسالة: أعلى الصفحة
        position: "right", // تحديد مكان الرسالة: على اليمين
        backgroundColor: color, // تحديد لون خلفية الرسالة
        close: true, // إظهار زر لإغلاق الرسالة
        stopOnFocus: true, // إيقاف الرسالة عند التفاعل معها
    }).showToast();
}

// ====================================================================

function sendWhatsAppMessage(event) {
        event.preventDefault(); // منع إرسال النموذج بالطريقة التقليدية

        // الحصول على البيانات من النموذج
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // الرقم الذي سيتم إرسال الرسالة إليه (استبدل بالرقم الذي تريده)
        const phoneNumber = "+966538886324"; // الرقم الذي سيتم إرسال الرسالة إليه عبر واتساب

        // نص الرسالة الذي سيتم إرساله
        const textMessage = `اسم المستخدم: ${name}\nالبريد الإلكتروني: ${email}\nالرسالة: ${message}`;

        // رابط واتساب مع النص
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(textMessage)}`;

        // فتح رابط واتساب لبدء المحادثة
        window.open(whatsappLink, '_blank');
    }
// ====================================================================
// جزء خاص بالتواصل الفورم -  النموذج
        // Form Validation
        document.getElementById("contact-form").addEventListener("submit", function(event) {
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            if (!name || !email || !message) {
                event.preventDefault();
                alert("يرجى تعبئة جميع الحقول.");
            }
        });
// ========================================================================

    // دالة البحث عن الكورسات
    document.getElementById('search-input').addEventListener('input', function() {
        var searchTerm = this.value.toLowerCase();
        var courseSections = document.querySelectorAll('.course-core');

        courseSections.forEach(function(course) {
            var courseTitle = course.querySelector('h3').textContent.toLowerCase();
            var courseDescription = course.querySelector('p').textContent.toLowerCase();

            // إخفاء الكورس إذا لم يتطابق مع البحث
            if (courseTitle.includes(searchTerm) || courseDescription.includes(searchTerm)) {
                course.style.display = 'block';
            } else {
                course.style.display = 'none';
            }
        });
    });

    // ====================================================================

    // داله الفلترة و البحث
    document.getElementById('search-input').addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const courses = document.querySelectorAll('.course-core');
        courses.forEach(course => {
            const title = course.querySelector('h3').textContent.toLowerCase();
            course.style.display = title.includes(query) ? 'block' : 'none';
        });
    });

    document.getElementById('filter-date').addEventListener('change', function () {
        const courses = Array.from(document.querySelectorAll('.course-core'));
        const value = this.value;

        if (value === 'newest') {
            courses.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
        } else if (value === 'oldest') {
            courses.sort((a, b) => new Date(a.dataset.date) - new Date(b.dataset.date));
        }

        const container = document.getElementById('courses-container');
        container.innerHTML = '';
        courses.forEach(course => container.appendChild(course));
    });

    document.getElementById('filter-type').addEventListener('change', function () {
        const value = this.value;
        const courses = document.querySelectorAll('.course-core');
        courses.forEach(course => {
            course.style.display = (value === '' || course.dataset.type === value) ? 'block' : 'none';
        });
    });

    // ====================================================================
// دالة زر تفاصيل الكورس
function INFO() {
    const courseDetails = `
        <strong>اسم الكورس :  </strong> دورة HTML الأساسية<br><br>
        <strong>الوصف :  </strong> تعلم أساسيات HTML وتصميم صفحات الويب.<br><br>
        <strong>اسم المدرب : </strong> م / أســـامــة الـــزيـــرو<br><br>
        <strong>تقييم الدورة : </strong> 4.5/5<br><br>
        <strong>الحالة : </strong> متوفر - 15 فيديو فقط<br><br>
        <strong>سعر الكورس : </strong> مجاني - يتوفر مشغل خاص للكورس<br><br>
        <strong>تاريخ الدورة : </strong> 08‏/01‏/2021<br><br>
        <strong>عدد الدروس : </strong> 37<br><br>
        <strong>عدد المسَجلين : </strong> 3
    `;

    // Create modal container
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = '#ffffff';
    modal.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
    modal.style.padding = '20px';
    modal.style.borderRadius = '10px';
    modal.style.zIndex = '1000';
    modal.style.width = '350px';
    modal.style.textAlign = 'right';
    modal.style.lineHeight = '1.8';
    modal.style.fontFamily = 'Arial, sans-serif';
    modal.style.fontSize = '14px';
    modal.style.direction = 'rtl'; // Set text direction to RTL
    modal.innerHTML = `
        <h2 style="margin-bottom: 15px; color: #333; text-align: center;">معلومات الدورة</h2>
        <p style="color: #555;">${courseDetails}</p>
        <div style="text-align: center; margin-top: 20px;">
            <button id="closeModalButton" style="background-color: #f44336; color: #ffffff; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; font-size: 14px;">إغلاق</button>
        </div>
    `;

    // Add modal to document
    document.body.appendChild(modal);

    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '999';
    overlay.id = 'modalOverlay';
    document.body.appendChild(overlay);

    // Add event listener to close button
    document.getElementById('closeModalButton').addEventListener('click', closeModal);

    // Add event listener to overlay
    overlay.addEventListener('click', closeModal);

    // Close modal function
    function closeModal() {
        // Smooth fade-out effect
        modal.style.transition = 'opacity 0.3s';
        overlay.style.transition = 'opacity 0.3s';
        modal.style.opacity = '0';
        overlay.style.opacity = '0';

        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.removeChild(overlay);
        }, 300);
    }
}

// ====================================================================

// دالة الفلترة حسب المدرب
document.getElementById('search-coach').addEventListener('input', function () {
        let searchQuery = this.value.toLowerCase();
        let courses = document.querySelectorAll('.course-core');
        let found = false;

        // التحقق من كل دورة ومقارنتها مع المدرب المطلوب
        courses.forEach(course => {
            let coach = course.getAttribute('data-coach').toLowerCase();
            if (coach.includes(searchQuery)) {
                course.style.display = 'block';
                found = true;
            } else {
                course.style.display = 'none';
            }
        });

        // عرض أو إخفاء رسالة الخطأ
        let errorMessage = document.getElementById('error-message');
        if (found) {
            errorMessage.style.display = 'none';
        } else {
            errorMessage.style.display = 'block';
        }
    });

    // دالة الفلترة حسب نوع الدورة
    document.getElementById('course-type-filter').addEventListener('change', function () {
        let selectedType = this.value;
        let courses = document.querySelectorAll('.course-core');
        let found = false;

        // التحقق من نوع الدورة
        courses.forEach(course => {
            let type = course.getAttribute('data-type');
            if (selectedType === '' || type === selectedType) {
                course.style.display = 'block';
                found = true;
            } else {
                course.style.display = 'none';
            }
        });

        // عرض أو إخفاء رسالة الخطأ
        let errorMessage = document.getElementById('error-message');
        if (found) {
            errorMessage.style.display = 'none';
        } else {
            errorMessage.style.display = 'block';
        }
    });



    document.getElementById("filter-date").addEventListener("change", filterCourses);
    document.getElementById("filter-type").addEventListener("change", filterCourses);

    function filterCourses() {
        const dateFilter = document.getElementById("filter-date").value;
        const typeFilter = document.getElementById("filter-type").value;
        const courses = document.querySelectorAll(".course-core");

        courses.forEach(course => {
            let showCourse = true;

            // تصفية حسب النوع
            if (typeFilter && course.getAttribute("data-type") !== typeFilter) {
                showCourse = false;
            }

            // تصفية حسب التاريخ
            const courseDate = new Date(course.getAttribute("data-date"));
            if (dateFilter === "newest" && courseDate < new Date()) {
                showCourse = false;
            } else if (dateFilter === "oldest" && courseDate > new Date()) {
                showCourse = false;
            }

            // إظهار أو إخفاء الدورة بناءً على الفلاتر
            if (showCourse) {
                course.style.display = "block";
            } else {
                course.style.display = "none";
            }
        });
    }

    // ====================================================================