

// رابط Google Apps Script للإرسال
const googleSheetURL = "https://script.google.com/macros/s/AKfycbwEAIF8lPaJy1JgnU5OFP0W-3XVkJTM6HUEBaRN3_0gvFIzlK9GEqh5AQcuf5EZ2DLT/exec";

/// تحقق من وجود مستخدم مسجل عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    const registeredEmails = JSON.parse(localStorage.getItem("registeredEmails")) || [];
    if (registeredEmails.length > 0) {
        document.getElementById("register-screen").classList.add("hidden"); // إخفاء شاشة التسجيل إذا كان هناك مستخدم مسجل
        document.getElementById("overlay").classList.add("hidden"); // إخفاء التراكب
        document.getElementById("main-buttons").classList.remove("hidden"); // إظهار الأزرار
    } else {
        document.getElementById("register-screen").classList.remove("hidden"); // إظهار شاشة التسجيل إذا لم يكن هناك مستخدم
        document.getElementById("overlay").classList.remove("hidden"); // إظهار التراكب
        document.getElementById("main-buttons").classList.add("hidden"); // إخفاء الأزرار حتى يتم التسجيل
      

    }
  
});

// التحقق من البريد الإلكتروني
function isEmailRegistered(email) {
    const registeredEmails = JSON.parse(localStorage.getItem("registeredEmails")) || [];
    return registeredEmails.includes(email);
}

// دالة التسجيل
function registerUser() {
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;

    if (!name || !email) {
        alert("يرجى إدخال الاسم والبريد الإلكتروني.");
        return;
    }

    if (isEmailRegistered(email)) {
        alert("هذا البريد الإلكتروني مسجل بالفعل. يمكنك الوصول إلى الميزات.");
        document.getElementById("register-screen").classList.add("hidden");
        document.getElementById("overlay").classList.add("hidden");
        document.getElementById("main-buttons").classList.remove("hidden"); // إظهار التطبيق
        return;
    }

    // حفظ البريد الإلكتروني في Google Sheets وLocal Storage
    fetch(googleSheetURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
        mode: "no-cors"
    })
    .then(() => {
        alert("تم التسجيل بنجاح!");
        const registeredEmails = JSON.parse(localStorage.getItem("registeredEmails")) || [];
        registeredEmails.push(email);
        localStorage.setItem("registeredEmails", JSON.stringify(registeredEmails));
        
        // إخفاء شاشة التسجيل وإظهار التطبيق
        document.getElementById("register-screen").classList.add("hidden");
        document.getElementById("overlay").classList.add("hidden");
        document.getElementById("main-buttons").classList.remove("hidden"); // إظهار الأزرار بعد التسجيل
    })
    .catch(error => console.error("Error:", error));
}



// بيانات البطولات حسب المسابقة
const championshipsByCompetition = {
    "كأس الملك": [1962, 1965, 1980, 1982, 1984, 1989, 2015, 2017, 2020, 2023, 2024],
    "الدوري الممتاز": [1977, 1979, 1985, 1986, 1988, 1990],
    "دوري روشن السعودي": [2024],
    "دوري أبطال آسيا": [1991, 2000, 2019, 2021],
    "دوري كأس الأمير محمد بن سلمان": [2020, 2021, 2022],
    "كأس ولي العهد": [1965,1964, 1995, 2000, 2003, 2005, 2006, 2008, 2009, 2010, 2011, 2012, 2013, 2016],
    "كأس الاتحاد السعودي": [1986, 1989, 1993, 1995],
    "كأس الأمير فيصل": [1999, 2005],
    "كأس المؤسس": [2000],
    "كأس السوبر السعودي": [2015, 2018, 2021, 2023, 2024],
    "بطولة الأندية العربية أبطال الدوري": [1994, 1995],
    "كأس الكؤوس العربية": [2000],
    "كأس النخبة العربية": [2001],
    "كأس الأندية الخليجية": [1986, 1998],
    "كأس السوبر السعودي المصري": [2001],
    "كأس السوبر الآسيوي": [1997, 2000],
    "كأس الكؤوس الآسيوية": [1996, 2002]
};




// دالة لعرض قسم البحث حسب المسابقة
function showCompetitionSearch() {
  hideAllSections();
    document.getElementById("competition-select").selectedIndex = 0; // إعادة تعيين القائمة المنسدلة
    document.getElementById("competition-results").innerHTML = ""; // تصفية النتائج
    document.getElementById("competition-search").classList.remove("hidden");


}

// دالة لعرض قسم التتويجات
function showTimeline() {
    hideAllSections();
    document.querySelector(".timeline-container").classList.remove("hidden");
   document.getElementById("year-select").selectedIndex = 0; // إعادة تعيين قائمة السنوات
    document.getElementById("championship-details").innerHTML = ""; // تصفية تفاصيل البطولات
    document.getElementById("championship-info").classList.add("hidden"); // إخفاء تفاصيل البطولات
}

// دالة لعرض قسم مباريات الهلال القادمة
function showMatches() {
    hideAllSections();
    document.getElementById("matches-schedule").classList.remove("hidden");
   fetchMatchesData(); // جلب البيانات عند عرض القسم
}

// دالة لعرض قسم مقاطع يوتيوب
function showYouTubeVideos() {
    hideAllSections();
    document.getElementById("youtube-videos").classList.remove("hidden");
   fetchYouTubeVideos(); // جلب البيانات عند عرض القسم
}

// دالة لإعادة العرض إلى الوضع الرئيسي
function resetView() {
    hideAllSections();
    document.getElementById("main-buttons").classList.remove("hidden"); // تأكد من عرض الأزرار الرئيسية فقط
}
// العودة إلى قائمة البطولات
function backToList() {
    document.getElementById("championship-info").classList.add("hidden");
    document.getElementById("championship-details").classList.remove("hidden");
}
// دالة لإظهار سلايدر الرؤساء وضمان إخفاء باقي الأقسام
function showPresidentSlider() {
    hideAllSections();
    
    const sliderContainer = document.getElementById("president-slider-container");
    sliderContainer.classList.remove("hidden");

    // جلب بيانات الرؤساء وعرضها في السلايدر
    fetchPresidentChampionshipData(displayPresidentChampSlider);
}

// دالة لإخفاء جميع الأقسام
function hideAllSections() {
  
    document.getElementById("competition-search").classList.add("hidden");
    document.querySelector(".timeline-container").classList.add("hidden");
    document.getElementById("matches-schedule").classList.add("hidden");
    document.getElementById("youtube-videos").classList.add("hidden");
    document.getElementById("championship-details").classList.add("hidden");
    document.getElementById("championship-info").classList.add("hidden");
     document.getElementById("youtube-videos").innerHTML = "";
    document.getElementById("president-slider-container").classList.add("hidden");

}

function showChampionshipDetails(year) {
    if (year) {
        showChampionshipsByYear(year);
    } else {
        document.getElementById("championship-details").innerHTML = "<p>يرجى اختيار سنة لعرض البطولات.</p>";
    }
}
// تعبئة القائمة المنسدله باسماء المسابقات

const competitionSelect = document.getElementById("competition-select");
Object.keys(championshipsByCompetition).forEach(competition => {
    const option = document.createElement("option");
    option.value = competition;
    option.textContent = competition;
    competitionSelect.appendChild(option);
});







function searchByCompetition() {
    const competition = document.getElementById("competition-select").value;
    const results = document.getElementById("competition-results");
    results.innerHTML = ""; // تنظيف النتائج السابقة

    if (competition && championshipsByCompetition[competition]) {
        // إضافة جميع البطولات حسب السنة
        championshipsByCompetition[competition].forEach(year => {
            const p = document.createElement("p");
            p.innerHTML = `<i class="fas fa-trophy"></i> عام ${year}`; // إضافة أيقونة الكأس
            results.appendChild(p);
        });

        // **إضافة هذه الأسطر في هذا المكان**
        // إضافة كلمة المجموعة وعدد البطولات في النهاية
        const groupInfo = document.createElement("p");
        groupInfo.style.fontWeight = "bold";
        groupInfo.style.marginTop = "15px";
        groupInfo.style.color = "#FFFFFF"; // لون النص
        groupInfo.style.backgroundColor = "#005fbf"; // لون الخلفية
        groupInfo.style.padding = "10px"; // حشوة داخلية
        groupInfo.style.borderRadius = "8px"; // زوايا دائرية
        groupInfo.innerHTML = `حقق الهلال منها : ${championshipsByCompetition[competition].length} بطولة`;
        results.appendChild(groupInfo);

    } else {
        results.innerHTML = "<p>لم يتم العثور على بطولات لهذه المسابقة.</p>";
    }
}





function resetSearch() {
    document.getElementById("competition-search").classList.add("hidden");
    document.getElementById("year-input").value = "";
    document.getElementById("year-results").innerHTML = "";
    document.getElementById("competition-results").innerHTML = "";
    document.querySelector(".timeline-container").classList.add("hidden");

    document.getElementById("championship-details").classList.add("hidden");
    document.getElementById("championship-info").classList.add("hidden");
}

// المعرفات المطلوبة لـ Google Sheets
const ConsentSheetID = "1ksZhTi3JW4QP5MOk8fcWnUCeXbmTqpXW4BLxLaHtmc8";
const championshipsSheet = "Sheet2";
const matchesSheet = "Sheet1";
const youtubeVideosSheet = "YouTubeVideos";
const ConsentChampionsLeagueSheet2 = "champcount";

// URLs للشيتات
const championshipsUrl = `https://docs.google.com/spreadsheets/d/${ConsentSheetID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(championshipsSheet)}`;
const matchesUrl = `https://docs.google.com/spreadsheets/d/${ConsentSheetID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(matchesSheet)}`;
const youtubeVideosUrl = `https://docs.google.com/spreadsheets/d/${ConsentSheetID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(youtubeVideosSheet)}`;
const presidentsUrl = `https://docs.google.com/spreadsheets/d/${ConsentSheetID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(ConsentChampionsLeagueSheet2)}`;

// دالة جلب البيانات من Google Sheets للمباريات
function fetchMatchesData() {
    Papa.parse(matchesUrl, {
        download: true,
        header: true,
        complete: function(results) {
            displayMatches(results.data);
            
        },
        error: function(error) {
            console.error("Error fetching matches data: ", error);
        }
    });
}

// عرض جدول المباريات
function displayMatches(data) {
    const tableBody = document.getElementById("matches-tbody");
    tableBody.innerHTML = "";
    data.forEach(match => {

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${match.Date}</td>
            <td>${match.Opponent}</td>
            <td>${match.Competition}</td>
            <td>${match.Location}</td>
        `;
        tableBody.appendChild(row);
    });
}

// جلب البيانات وعرض البطولات من Google Sheets
function fetchChampionshipData() {
    Papa.parse(championshipsUrl, {
        download: true,
        header: true,
        complete: function(results) {
            populateYearSelect(results.data);
              
        },
        error: function(error) {
            console.error("Error fetching championships data: ", error);
        }
    });
}

// ملء قائمة السنوات بالبطولات
function populateYearSelect(data) {
    const yearSelect = document.getElementById("year-select");
    yearSelect.innerHTML = '<option value="">اختـــر سنــة التتويــج</option>';
    const uniqueYears = [...new Set(data.map(item => item["Year"]))];

    uniqueYears.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });

    yearSelect.onchange = () => {
        showChampionshipsByYear(data, yearSelect.value);
    };
}

// عرض البطولات حسب السنة
function showChampionshipsByYear(data, year) {
    const detailsContainer = document.getElementById("championship-details");
    const infoContainer = document.getElementById("championship-info");
    detailsContainer.classList.remove("hidden");
    infoContainer.classList.add("hidden");

    const championships = data.filter(item => item["Year"] == year); // استخدم "Year" للتصفية
    if (championships.length > 0) {
        detailsContainer.innerHTML = `
            <h3>اختر البطولة لمشاهدة تفاصيلها</h3>
            ${championships.map((championship, index) => `
                <p><a href="#" onclick="showChampionshipInfo(${JSON.stringify(championship).replace(/"/g, '&quot;')})">${championship["Name"]}</a></p>
            `).join("")}
        `;
    } else {
        detailsContainer.innerHTML = "<p>لا توجد بطولات لهذا العام</p>";
    }
}

// عرض تفاصيل البطولة
function showChampionshipInfo(championship) {
    const infoContainer = document.getElementById("championship-info");
    document.getElementById("championship-details").classList.add("hidden");
    infoContainer.classList.remove("hidden");
    infoContainer.innerHTML = `
          <h3 class="info-title">${championship["Name"]}</h3>
         <p><strong>الموسم:</strong> ${championship["Date"] || "غير متوفر"}</p>
        <p><strong>المباراة النهائية:</strong> ${championship["Final Match"]}</p>
        <p><strong>النتيجة:</strong> ${championship["Score"]}</p>
         <p><strong>الكابتن:</strong> ${championship["captn"] || "غير متوفر"}</p>
        <p><strong>رقم البطولة:</strong> ${championship["Championship Rank"] || "غير متوفر"}</p>
        <img src="${championship["Image URL"]}" alt="${championship["Name"]}" style="max-width: 100%; height: auto; margin-top: 15px;">
        <button onclick="backToList()">العودة إلى قائمة البطولات</button>
    `;
}


// دالة جديدة لجلب بيانات البطولات حسب السنة من Google Sheets
function fetchDataByYear(year, callback) {
    Papa.parse(championshipsUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data.filter(item => item["Year"] == year);
            callback(data);
        },
        error: function(error) {
            console.error("Error fetching championships data by year: ", error);
        }
    });
}

// دالة البحث حسب العام باستخدام الدالة الجديدة لجلب البيانات
function searchByYear() {
    const yearInput = document.getElementById("year-input").value;
    const resultsContainer = document.getElementById("year-results");

    resultsContainer.innerHTML = ""; // تنظيف النتائج السابقة

    if (!yearInput) {
        resultsContainer.innerHTML = "<p>يرجى إدخال سنة للبحث.</p>";
        return;
    }

    fetchDataByYear(yearInput, (data) => {
        if (data.length > 0) {
            resultsContainer.innerHTML = data.map(championship => `
                <p><strong>${championship["Name"]}</strong></p>
            `).join("");
        } else {
            resultsContainer.innerHTML = "<p>لا توجد بطولات لهذا العام.</p>";
        }
    });
}





// جلب وعرض مقاطع اليوتيوب من Google Sheets
function fetchYouTubeVideos() {
    Papa.parse(youtubeVideosUrl, {
        download: true,
        header: true,
        complete: function(results) {
            displayYouTubeVideos(results.data);
        },
        error: function(error) {
            console.error("Error fetching YouTube videos data: ", error);
        }
    });
}

// عرض مقاطع اليوتيوب في شكل شبكة
function displayYouTubeVideos(videos) {
    const container = document.getElementById("youtube-videos");
    container.innerHTML = videos.map(video => `
        <div class="video-card">
            <iframe src="https://www.youtube.com/embed/${video.videoId}" title="${video.title}" frameborder="0" allowfullscreen></iframe>
            <p>${video.title}</p>
        </div>
    `).join("");
}


// دالة لجلب بيانات الرؤساء من الشيت champcount
function fetchPresidentChampionshipData(callback) {
    Papa.parse(presidentsUrl, {
        download: true,
        header: true,
        complete: function(results) {
            callback(results.data);
        },
        error: function(error) {
            console.error("Error fetching president championships data: ", error);
        }
    });
}
// دالة لتشغيل السلايدر بعد إضافة بيانات الرؤساء
// تفعيل السلايدر وضبط الأزرار والبداية من الشريحة الأولى
function displayPresidentChampSlider(data) {
    const sliderContainer = document.getElementById("president-slider");
    sliderContainer.innerHTML = ""; // تنظيف السلايدر

    data.forEach((president, index) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
            <div class="president-card">
                <img src="${president["ImageURL"]}" alt="${president["presidentName"]}" class="president-image">
                  <p class="president-number"><strong>الرئيس رقم:</strong> ${president["no"]}</p>
                <h3>${president["presidentName"]}</h3>
                <p class="period"><strong>الفترة الزمنية:</strong> ${president["TenurePeriods"]}</p>
                <p class="championships"><strong>عدد البطولات:</strong> ${president["ChampionshipsCount"]}</p>
                  <i class="fas fa-trophy"></i> <!-- أيقونة الكأس مباشرة بعد الرقم -->
               
            </div>
        `;
        sliderContainer.appendChild(slide);
    });

    // تفعيل السلايدر وتعيين الشريحة الأولى عند كل فتح
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        slidesPerView: 1,
        spaceBetween: 10,
        initialSlide: 0, // تعيين السلايدر ليبدأ من الشريحة الأولى
    });

    // إعادة السلايدر إلى الشريحة الأولى عند كل فتح
    swiper.slideTo(0);
}



function showAboutCard() {
    document.getElementById("about-card").classList.remove("hidden");
}

function closeAboutCard() {
    document.getElementById("about-card").classList.add("hidden");
}

