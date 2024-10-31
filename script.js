// بيانات البطولات حسب العام
const championshipsByYear = {
    "1962": ["كأس الملك"],
    "1965": ["كأس الملك", "كأس ولي العهد"],
    "1980": ["كأس الملك"],
    "1982": ["كأس الملك"],
    "1984": ["كأس الملك"],
    "1989":  ["كأس خادم الحرمين الشرفين", "كأس الأتحاد السعودي"],
    "2015": ["كأس خادم الحرمين الشرفين", "كأس السوبر السعودي"],
    "2017": ["كأس خادم الحرمين الشرفين", "الدوري السعودي للمحترفين"],
    "2020": ["كأس خادم الحرمين الشرفين", "دوري كأس الأمير محمد بن سلمان"],
    "2023": ["كأس خادم الحرمين الشرفين", "كأس السوبر السعودي"],
    "2024": ["كأس خادم الحرمين الشرفين", "دوري روشن السعودي", "كأس السوبر السعودي"],

    "1977": ["الدوري الممتاز"],
    "1979": ["الدوري الممتاز"],
    "1985": ["الدوري الممتاز"],
    "1986": ["الدوري الممتاز", "كأس الاتحاد السعودي","كاس الأندية الخليجية"],
    "1988": ["الدوري الممتاز"],
    "1990": ["الدوري الممتاز"],
    "1991": ["دوري أبطال آسيا"],
    "1993": ["كأس الاتحاد السعودي"],
    "1994": ["بطولة الأندية العربية أبطال الدوري"],
    "1995": ["كأس ولي العهد",  "كأس الأتحاد السعودي" , "بطولة الأندية العربية أبطال الدوري"],
    "1996": ["كأس الكؤوس الآسيوية", "كأس دوري خادم الحرمين الشرفين"],
    "1997": ["كأس السوبر الأسيوي"],
    "1998": ["كأس الأندية الخليجية", "كأس دوري خادم الحرمين الشرفين"],
    "1999": ["كأس الأمير فيصل بن فهد"],
    "2000": ["كأس ولي العهد", "دوري أبطال آسيا", "كأس المؤسس", "كأس الكؤوس العربية", "كأس السوبر الآسيوي"],
    "2001": ["كأس النخبة العربية", "كأس السوبر السعودي المصري"],  
    "2002": ["كأس الكؤوس الآسيوية", "كأس دوري خادم الحرمين الشرفين"],
    "2003": ["كأس ولي العهد"],
    "2005": ["كأس دوري خادم الحرمين الشرفين", "كأس ولي العهد", "كأس الأمير فيصل بن فهد"],
    "2006": ["كأس ولي العهد"],
    "2008": ["الدوري السعودي الممتاز", "كأس ولي العهد"],
    "2009": ["كأس ولي العهد"],
    "2010": ["الدوري السعودي للمحترفين", "كأس ولي العهد"],
    "2011": ["الدوري السعودي للمحترفين", "كأس ولي العهد"],
    "2012": ["كأس ولي العهد"],
    "2013": ["كأس ولي العهد"],
    "2016": ["كأس ولي العهد"],
    "2018": ["كأس السوبر السعودي", "الدوري السعودي للمحترفين"],
    "2019": ["دوري أبطال آسيا"],
    "2021": ["دوري كأس الأمير محمد بن سلمان", "دوري أبطال آسيا"],
    "2022": ["دوري كأس الأمير محمد بن سلمان","كأس السوبر السعودي"]
};

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

// تفعيل البحث حسب العام
function showYearSearch() {
    document.getElementById("year-search").classList.remove("hidden");
    document.getElementById("competition-search").classList.add("hidden");
}

// تفعيل البحث حسب المسابقة
function showCompetitionSearch() {
    document.getElementById("competition-search").classList.remove("hidden");
    document.getElementById("year-search").classList.add("hidden");

    // تحميل أسماء المسابقات في القائمة المنسدلة
    const competitionSelect = document.getElementById("competition-select");
    competitionSelect.innerHTML = '<option value="">اختر المسابقة</option>'; // لإعادة التعيين
    for (let competition in championshipsByCompetition) {
        let option = document.createElement("option");
        option.value = competition;
        option.textContent = competition;
        competitionSelect.appendChild(option);
    }
}

// البحث حسب العام
function searchByYear() {
    const year = document.getElementById("year-input").value;
    const results = document.getElementById("year-results");
    results.innerHTML = ""; // لإعادة تعيين النتائج

    if (championshipsByYear[year]) {
        championshipsByYear[year].forEach(championship => {
            const p = document.createElement("p");
            p.textContent = championship;
            results.appendChild(p);
        });
    } else {
        results.innerHTML = "<p>لم يحقق الهلال اي بطولة هذا العام</p>";
    }
}

// البحث حسب المسابقة
function searchByCompetition() {
    const competition = document.getElementById("competition-select").value;
    const results = document.getElementById("competition-results");
    results.innerHTML = ""; // لإعادة تعيين النتائج

    if (championshipsByCompetition[competition]) {
        championshipsByCompetition[competition].forEach(year => {
            const p = document.createElement("p");
            p.textContent = year;
            results.appendChild(p);
        });
    } else {
        results.innerHTML = "<p>لم يتم العثور على بطولات لهذه المسابقة.</p>";
    }
}

// إعادة البحث والعودة للصفحة الرئيسية
function resetSearch() {
    document.getElementById("year-search").classList.add("hidden");
    document.getElementById("competition-search").classList.add("hidden");
    document.getElementById("year-input").value = "";
    document.getElementById("year-results").innerHTML = "";
    document.getElementById("competition-results").innerHTML = "";
}
