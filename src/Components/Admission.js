import React from 'react'
import './admissionForm.css'
import { useState } from 'react';

function Admission() {


    // FOR LINKING WITH SPREADSHEET--------------------------------------------------------------------------------------------

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzd927VZTCEY9k9Cpsl65ELPcQ1lSqHytYtagrr4VeB-zuZ31OoiIcJKIVk20bkO6c/exec'
    let obj={};

    //use state to handle form datas whenever they are changed
    const [formData, setFormData] = useState({
        // Initialize form data here if needed
        Name: "",	fatherName: "",	DOB: "",	Gender: "",	Category: "",	aadharNumber: "",	Address: "",	Country: "",	City: "",	Pincode: "",	State: "",	District: "",	Mobile: "",	fatherMobile: "",	Email: "",	XPercentage: "",	XIIPercentage: "", studentPhoto: "", aadharCard: "",	Source: "",	Session: "",	StudyMode: "",	Stream: "",	Course: ""
    });


    //handles any input field change of the form
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    }



    //when submit button is pressed
    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Your Form was Successfully Submitted ");

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: new FormData(e.target),
            });
        
            if (response.ok) {
                alert("Your Form was Successfully Submitted !");
                // You can also reset the form data here if needed
                setFormData({
                // Reset form data if needed
                });
            } else {
                console.error('Error!', response.statusText);
            }
            } catch (error) {
            console.error('Error!', error.message);
        }


        // This line declares a variable called "file" and assigns it the value of the first input element on the page
        let file = document.getElementById("studentPhoto");
        // Check if a file is selected
        if (file.files.length > 0) {
            console.log(1);
            //This line creates a new FileReader object called "fr"
            let fr = new FileReader();
            // This line adds an event listener to the "loadend" event of the FileReader object
            fr.addEventListener('loadend',()=>{
                // This line declares a variable called "res" and assigns it the result of the FileReader object
                let res = fr.result;
                // This line splits the "res" variable into an array, using the string "base64," as the separator, and assigns the second element to a variable called "spt"
                let spt = res.split("base64,")[1];
                // This line creates an object called "obj" with three properties: "base64", "type", and "name"
                obj.base64=spt;
                obj.imgType=file.files[0].type;
                obj.imgName=file.files[0].name;
                // This line sends a POST request to the URL specified in the "url" variable, with the "obj" object as the request body
                // fetch(url,{
                //     method:"POST",
                //     body:JSON.stringify(obj)
                // })
                // // This line waits for the response from the server and converts it to text
                // .then(r=>r.text())
                // // This line logs the response data to the console
                // .then(data=>console.log(data))
            })
            // This line reads the selected file as a data URL
            fr.readAsDataURL(file.files[0])
        }



        // This line declares a variable called "file" and assigns it the value of the first input element on the page
        let file2 = document.getElementById("aadharCard");
        // Check if a file is selected
        if (file2.files.length > 0) {
            console.log(1);
            //This line creates a new FileReader object called "fr"
            let fr = new FileReader();
            // This line adds an event listener to the "loadend" event of the FileReader object
            fr.addEventListener('loadend',()=>{
                // This line declares a variable called "res" and assigns it the result of the FileReader object
                let res = fr.result;
                // This line splits the "res" variable into an array, using the string "base64," as the separator, and assigns the second element to a variable called "spt"
                let spt = res.split("base64,")[1];
                // This line creates an object called "obj" with three properties: "base64", "type", and "name"
                obj.base64i=spt;
                obj.imgType2=file2.files[0].type;
                obj.imgName2=file2.files[0].name;
                // This line sends a POST request to the URL specified in the "url" variable, with the "obj" object as the request body
                fetch(scriptURL,{
                    method:"POST",
                    mode: 'cors',
                    body:JSON.stringify(obj)
                })
                // This line waits for the response from the server and converts it to text
                .then(r=>r.text())
                // This line logs the response data to the console
                .then(data=>console.log(data))
            })
            // This line reads the selected file as a data URL
            fr.readAsDataURL(file2.files[0])
        }

        
    };











    // FOR STATES AND CORRESPONDING DISTRICTS OPTION----------------------------------------------------------------------------------

    function updateDistricts(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        const stateSelect = document.getElementById("state");
        const districtSelect = document.getElementById("district");

        // Clear existing options
        districtSelect.innerHTML = '<option value="">Select District</option>';

        // Define districts for each state
        const districts = {
            "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "Y.S.R. Kadapa"],
                "Arunachal Pradesh": ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Siang", "Upper Siang", "Lower Siang", "Lower Dibang Valley", "Dibang Valley", "Anjaw", "Lohit", "Namsai", "Changlang", "Tirap", "Longding"],
                "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
                "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
                "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
                "Goa": ["North Goa", "South Goa"],
                "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
                "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
                "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
                "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
                "Karnataka": ["Bagalkot", "Ballari (Bellary)", "Belagavi (Belgaum)", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi (Gulbarga)", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru (Mysore)", "Raichur", "Ramanagara", "Shivamogga (Shimoga)", "Tumakuru (Tumkur)", "Udupi", "Uttara Kannada", "Vijayapura (Bijapur)", "Yadgir"],
                "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
                "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
                "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
                "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
                "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri-Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
                "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip"],
                "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
                "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar (Keonjhar)", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur (Sonepur)", "Sundargarh"],
                "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Tarn Taran"],
                "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
                "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
                "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
                "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Kumuram Bheem", "Mahabubabad", "Mahbubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Nagarkurnool", "Nalgonda", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
                "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
                "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shrawasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
                "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
                "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur (South Dinajpur)", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur (West Medinipur)", "Purba Medinipur (East Medinipur)", "Purulia", "South 24 Parganas", "Uttar Dinajpur (North Dinajpur)"],
                "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
                "Chandigarh": ["Chandigarh"],
                "Dadra and Nagar Haveli": ["Dadra and Nagar Haveli", "Daman and Diu"],
                "Daman and Diu": ["Daman", "Diu"],
                "Lakshadweep": ["Lakshadweep"],
                "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
                "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"]

                
        };

        const selectedState = stateSelect.value;

        // Populate districts for the selected state
        if (districts[selectedState]) {
            districts[selectedState].forEach(district => {
                const option = document.createElement("option");
                option.value = district;
                option.text = district;
                districtSelect.add(option);
            });
        }
    }











    // FOR STREAM AND CORRESPONDING COURSES OPTION----------------------------------------------------------------------------------

    function updateCourse(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        const streamSelect = document.getElementById("Stream");
        const courseSelect = document.getElementById("Course");

        // Clear existing options
        courseSelect.innerHTML = '<option value="">Select Course</option>';

        // Define districts for each state
        const Course = {
            "Engineering": ["Arjuna", "Chaitanya", "Eklavya"],
            "Medical": ["Ananta", "Sudarshan", "Swadhyaya"],
            "Foundation": ["Aadhya", "Abhinav", "Abhyas", "Aarohan", "Atal"],
            "DLP": ["Sankalp", "Utkarsh", "Lakshya", "Abhiyaan", "Yukti", "Sarthak", "Pragya"],
            "Boards": ["Sammarsa", "Vikash", "Daksh", "Samridhi"]  
        };

        const selectedStream = streamSelect.value;

        // Populate districts for the selected state
        if (Course[selectedStream]) {
            Course[selectedStream].forEach(Course => {
                const option = document.createElement("option");
                option.value = Course;
                option.text = Course;
                courseSelect.add(option);
            });
        }
    }




    //IMAGE SIZE ERROR
    function imageSize(){
        // document.getElementsByClassName("file-upload-message").style.color = "red";
        alert("Please upload an image of size less than 200KB");
        document.getElementById("studentPhoto").value = "";
        document.getElementById("aadharCard").value = "";
    }





  return (
    <>
      <div className="container">
        <h2>Personal Information</h2>
        <form id="admissionForm" method='post' onSubmit={handleSubmit} name="admissionForm">
            <div className="form-group">
                <input type="text" id="name" name="Name" placeholder="Name*" onChange={handleChange} value={formData.Name} className="input-three" required />
                <input type="text" id="fname" name="fatherName" placeholder="Father's Name*" onChange={handleChange} value={formData.fatherName} className="input-three" required />
                <input type="date" placeholder="Date of Birth (DOB)*" onChange={handleChange} value={formData.DOB} className="input-three" name="DOB" required />
            </div>
            <div className="form-group">
                <select placeholder="Gender" name="Gender" onChange={handleChange} value={formData.Gender} className="input-three" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <select placeholder="Category" name="Category" onChange={handleChange} value={formData.Category} className="input-three" required>
                    <option value="">Select Category</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                </select>
                <input type="text" id="aadhar" name="aadharNumber" placeholder="Aadhar No (optional)" onChange={handleChange} value={formData.aadharNumber} className="input-three" />
            </div>
            <div className="form-group">
                
                <input type="text" id="address" name="Address" placeholder="Permanent Address*" onChange={handleChange} value={formData.Address}  required />
                <input type="text" id="city" name="City" placeholder="City/town/village*" onChange={handleChange} value={formData.City} className="input-four" required />
            </div>
           
            <div className="form-group">
                <select placeholder="Country" name="Country" onChange={handleChange} value={formData.Country}  className="input-four" required>
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                </select>
                
                <input type="number" id="pincode" name="Pincode" placeholder="Pin Code*" onChange={handleChange} value={formData.Pincode}  className="input-four" min="100000" max="999999" required />

                <select id="state" name="State" onChange={updateDistricts} value={formData.State} className="input-four" required>
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                    <option value="Daman and Diu">Daman and Diu</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Puducherry">Puducherry</option>
                </select>
                
                <select id="district" name="District" onChange={handleChange} value={formData.District} className="input-four" required>
                    <option value="">Select District</option>
                    {/* <!-- Options will be dynamically populated using JavaScript --> */}
                </select>
            </div>

            
            <div className="form-group">
                <input type="number" id="mobile" name="Mobile" placeholder="Mobile (self)*" onChange={handleChange} value={formData.Mobile} className="input-three" required />
                <input type="number" id="fmobile" name="fatherMobile" placeholder="Mobile (father)*" onChange={handleChange} value={formData.fatherMobile} className="input-three" required />
                <input type="email" id="email" name="Email" placeholder="Email Id*" onChange={handleChange} value={formData.Email} className="input-three" required />
            </div>
            <div className="form-group">
                <input type="number" id="percentage10" name="XPercentage" placeholder="10th Percentage*" onChange={handleChange} value={formData.XPercentage} className="input-half" min="0" max="100" required />
                <input type="number" id="percentage12" name="XIIPercentage" placeholder="12th Percentage*" onChange={handleChange} value={formData.XIIPercentage} className="input-half" min="0" max="100" required />
            </div>

            <div className="form-group">
                <div className="file-upload">
                    <label htmlFor="studentPhoto">Student Photo:</label>
                    <input type="file" id="studentPhoto" name="studentPhoto" accept=".jpg" onChange={(event) => {
                                                                                        if (event.target.files && event.target.files[0]) {
                                                                                            if (event.target.files[0].size > 200 * 1024) {
                                                                                                imageSize();
                                                                                                return false;
                                                                                            }
                                                                                        }
                                                                                    }} required />
                    <div className="file-upload-message">Image should be "jpg" only and the size should be less than 200kb.</div>
                    <img id="photo" src="" alt="" />
                </div>
            
                <div className="file-upload">
                    <label htmlFor="aadharCard">Aadhar Card:</label>
                    <input type="file" id="aadharCard" name="aadharCard" accept=".jpg" onChange={(event) => {
                                                                                        if (event.target.files && event.target.files[0]) {
                                                                                            if (event.target.files[0].size > 200 * 1024) {
                                                                                                imageSize();
                                                                                                return false;
                                                                                            }
                                                                                        }
                                                                                    }} required />
                    <div className="file-upload-message">Image should be "jpg" only and the size should be less than 200kb.</div>
                    <img id="aadharphoto" src="" alt="" />
                </div>
                
            </div>

            <input type="text" id="source" name="Source" placeholder="How did you come to know about IIT Academy?*" onChange={handleChange} value={formData.Source} required />



            <h2>Course Information</h2>


            <div className="form-group">
                <select placeholder="Session" name="Session" onChange={handleChange} value={formData.Session} className="input-half" required>
                    <option value="">Select Session</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2024-26">2024-26</option>
                </select>
                <select placeholder="Study Mode" name="StudyMode" onChange={handleChange} value={formData.StudyMode} className="input-half" required>
                    <option value="">Select Study Mode</option>
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                </select>
            </div>
            <div className="form-group">
                <select placeholder="Stream" id="Stream" name="Stream" onChange={updateCourse} value={formData.Stream} className="input-half" required>
                    <option value="">Select Stream</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Medical">Medical</option>
                    <option value="Foundation">Foundation</option>
                    <option value="DLP">DLP</option>
                    <option value="Boards">Boards</option>
                </select>
                <select placeholder="Course" id="Course" name="Course" onChange={handleChange} value={formData.Course} className="input-half" required>
                    <option value="">Select Course</option>
                </select>
            </div>
        
        
            <label>
                <input type="checkbox" id="agree" name="agree" required />
                I agree
            </label>
            <p className="agreeMsg">By submitting this form, I agree to receive all the whatsapp communication on my registered mobile number and agreeing to terms of Use and Privacy Policy.</p>
        
            <button type="submit" >Submit Now</button>
        </form>
    </div>

    </>
  )
}

export default Admission
