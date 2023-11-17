var colors = ["#ec496c", "#3067de", "#03a7f1", "#1dbec0"];

var notes = []

var groups = [{ name: 'General', tasks: 0, color: "#3067de" }
    , { name: 'Home', tasks: 0, color: "#03a7f1" }
    , { name: 'Work', tasks: 0, color: "#ec496c" }]


groups.forEach(item => {
    createGroup(item.name, item.tasks, item.color)
});

var tags = ['Home', 'Design']


function createNote(id, noteText, selectedGroup, selectedTag, meetingTime, status) {
    return {
        id: id,
        noteText: noteText,
        selectedGroup: selectedGroup,
        selectedTag: selectedTag,
        meetingTime: meetingTime,
        status: status
    };
}



notes.push(createNote('Note1', 'This is note 1', 'General', 'Home', '2023-06-07T12:00', false));
notes.push(createNote('Note2', 'Another note here', 'Home', 'Home', '2023-06-08T14:00', true));
notes.push(createNote('Note3', 'Note for work', 'Work', 'Home', '2023-06-09T10:00', true));

showNotes(notes)
controlChart();

let icons = document.querySelectorAll(".icon span")
icons.forEach(icon => {
    var randomNumber = Math.floor(Math.random() * (colors.length))
    icon.style.color = colors[randomNumber]
});


function createGroup(name, tasks, color) {
    var randomNumber = Math.floor(Math.random() * (colors.length))
    let h
    if (name === 'General') {
        h = `<div class="item" data-bgcolor="${color}">
    <p class="name">${name}</p>
    <p class="tasks">${tasks} tasks</p>
</div>`
    } else {
        h = `<div class="item" data-bgcolor="${color}">
    <p class="name">${name}</p>
    <p class="tasks">${tasks} tasks</p>
    <i class="fa-solid fa-pen" onclick="deleteGroup('${name}', this)"></i>
</div>`
    }
    let group = document.getElementsByClassName('group-items')
    group[0].insertAdjacentHTML('beforeend', h)
    let groupItem = document.querySelectorAll(".group-items .item")
    for (i = 0; i < groupItem.length; i++) {
        groupItem[i].style.setProperty('--bgcolor', groupItem[i].getAttribute('data-bgcolor'))
    }
    
}


function deleteGroup(name, e) {
    if (confirm('Do you want to remove group') == true) {
        const removeIndex = groups.indexOf(name);
        groups.splice(removeIndex, 1);
        e.parentElement.remove()
    }
}
// -----------------------
let checkInput = 0
function handleKeyDown(event) {
    // Kiểm tra xem phím được nhấn có phải là Enter không (mã ASCII 13)
    if (checkInput == 0) return
    if (event.key == 'Enter') {
        // Ngăn chặn hành động mặc định của phím Enter (nếu cần)
        event.preventDefault();
        if (checkInput == 1) addInputGroup()
        if (checkInput == 2) addInputTag()
        if (checkInput == 3) addNote()
        
    }
    if (event.key === 'Escape') {
        closeInput(document.getElementById('input'))

    }
}
// -------------------------------

function closeInput(e) {
    e.remove()
}

// hide/show input for group 
function showInput(flag) {
    let h
    if (flag == 1) {
        h = `<div id="input" class='active' onclick="closeInput(this)">
    <div class="input-zone" onclick="preventClose(event)">
        <label for="inp" class="inp">
            <input type="text" id="inp" placeholder="&nbsp;" maxlength="25 ">
            <span class="label">Group's&nbspName</span>
        </label>
        <input type="color" name="color" id="colorGroup" value="#1dbec0">
        <button id="input-bt" type="button" onclick="addInputGroup()">Add</button>
    </div>
</div>`
        checkInput = 1
    }
    if (flag == 2) {
        h = `<div id="input" class='active' onclick="closeInput(this)" style="width: 100%">
    <div class="input-zone" onclick="preventClose(event)">
        <label for="inp" class="inp">
            <input type="text" id="inp" placeholder="&nbsp;" maxlength="25 ">
            <span class="label">Tag's&nbspName</span>
        </label>
        <button id="input-bt" type="button" onclick="addInputTag()">Add</button>
    </div>
</div>`
        checkInput = 2
    }
    if (flag == 3) {
        h = `<div id="input" class='active' onclick="closeInput(this)" style="width: 100%">
        <div class="input-zone" onclick="preventClose(event)">
            <label for="inp" class="inp">
                <input style="width: 100%;" type="text" id="inp" placeholder="&nbsp;" maxlength="50 ">
                <span class="label">Your's&nbspNote</span>
            </label>
            <label for="groupSelect">Select a group:</label>
            <select id="groupSelect">
                <!-- Options will be added dynamically using JavaScript -->
            </select>
            <label for="tagSelect">Select a tag:</label>
            <select id="tagSelect">
                <!-- Option s will be added dynamically using JavaScript -->
            </select>
            <input type="datetime-local" id="meeting-time" name="meeting-time" 
                min="2023-06-07T00:00" max="2100-06-14T00:00" />
            <button id="input-bt" type="button" onclick="addNote()">Add Note</button>
        </div>
    </div>`
        checkInput = 3
    }

    document.querySelector('body').insertAdjacentHTML('beforeend', h)
    loadInputNote()
}


function addInputGroup() {
    var name = document.getElementById('inp').value
    var color = document.getElementById('colorGroup').value
    if (groups.find(group => group.name === name)) {
        alert('Đã tồn tại group cùng tên')
    } else if (name == "") {
        alert('Vui Long Nhap Ten group')
    } else {
        createGroup(name, 0, color)
        groups.push({ name: name, tasks: 0, color: color })
        document.getElementById('inp').value = ""
        closeInput(document.getElementById('input'))
        alert("Group duoc tao thanh cong")
    }

}
// ----------------------------------------------------\\
function createTag(name) {
    var tagItem = document.querySelectorAll('.tag-container span')
    tagItem[0].insertAdjacentHTML('afterend', `<span><a href="#">${name}</a></span>`)
}

function addInputTag() {
    var name = document.getElementById('inp').value
    if (tags.find(tag => tag === name)) {
        alert('Đã tồn tại tag cùng tên')
    } else if (name == "") {
        alert('Vui Long Nhap Ten tag')
    } else {
        createTag(name)
        tags.push(name)
        document.getElementById('inp').value = ""
        closeInput(document.getElementById('input'))
        alert("Tag duoc tao thanh cong")
    }
}
// -------------------------------------------------------

//stop event 
function preventClose(event) {
    event.stopPropagation()
}

// --------Add Note ------------

function loadInputNote() {
    var selectGroup = document.getElementById('groupSelect')
    var selectTag = document.getElementById('tagSelect')
    groups.forEach(function (group) {
        var option = document.createElement('option');
        option.value = group.name // Set the value of the option
        option.text = group.name // Set the text content of the option
        selectGroup.appendChild(option) // Append the option to the select element
    });

    tags.forEach(function (tag) {
        var option = document.createElement('option')
        option.value = tag
        option.text = tag
        selectTag.appendChild(option)
    })

    var now = new Date();
    var year = now.getFullYear();
    var month = ('0' + (now.getMonth() + 1)).slice(-2);
    var day = ('0' + now.getDate()).slice(-2);
    var hours = ('0' + now.getHours()).slice(-2);
    var minutes = ('0' + now.getMinutes()).slice(-2);

    // Định dạng ngày và giờ theo định dạng của input datetime-local
    var currentDateTime = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;

    // Đặt giá trị cho input datetime-local
    document.getElementById('meeting-time').value = currentDateTime;

}
function addNote() {
    // Lấy giá trị từ các trường input và select
    var noteText = document.getElementById('inp').value;
    var selectedGroup = document.getElementById('groupSelect').value;
    var selectedTag = document.getElementById('tagSelect').value;
    var meetingTime = document.getElementById('meeting-time').value;

    // Tạo một đối tượng mới với các giá trị lấy được
    var note = {
        id: createIdNote(), // Hàm tạo ID duy nhất
        noteText: noteText,
        selectedGroup: selectedGroup,
        selectedTag: selectedTag,
        meetingTime: meetingTime,
        status: false
    };

    // Thêm đối tượng vào mảng
    notes.push(note);
    closeInput(document.getElementById('input'))
    showNotes(filterNoteByGroup(note.selectedGroup  ))
    controlChart()
}

function createIdNote() {
    // tao id cho note
    return 'note' + (notes.length + 1)
}

// const result = words.filter((word) => word.length > 6);
function filterNoteByGroup(name) {
    var result = notes.filter(note => note.selectedGroup === name)
    return result
}

var hCenter = document.getElementById('heading-center')

var groupItems = document.querySelectorAll('.group-items .item');
groupItems.forEach(function (item, index) {
    item.addEventListener("click", function () {
        hCenter.innerHTML = groups[index].name
        if (index == 0) {
            notesFilter = notes
        } else {
            notesFilter = filterNoteByGroup(groups[index].name)
        }
        clearNotes()
        showNotes(notesFilter)
    });
});

function showNotes(notesGroup) {
    var center = document.querySelectorAll('.center-contaier')
    notesGroup.forEach(note => {
        let h
        if (note.status == true) {
            h = `<div class="note-item">
            <input onchange="handleCheckbox('${note.id}')" checked type="checkbox" id="${note.id}"><label for="${note.id}">${note.noteText}</label><i onclick="changeNote('${note.id}')"  class="fa-solid fa-bars"></i>
            <p>${note.selectedGroup} - ${note.selectedTag}</p>
            </div>`
        } else {
            h = `<div  class="note-item">
            <input onchange="handleCheckbox('${note.id}')" type="checkbox" id="${note.id}"><label for="${note.id}">${note.noteText}</label><i onclick="changeNote('${note.id}')" class="fa-solid fa-bars"></i>
            <p>${note.selectedGroup} - ${note.selectedTag}</p>
            </div>`
        }
        center[0].insertAdjacentHTML('beforeend', h)
    });

}

function clearNotes() {
    var notes = document.querySelectorAll('.note-item')
    notes.forEach(note => {
        note.remove()
    });
}


function calculatePercentage() {
    var totalNotes = notes.length;
    var trueNotes = notes.filter(note => note.status === true).length;

    if (totalNotes === 0) {
        return 0;
    }

    return (trueNotes / totalNotes) * 100;
}

function controlChart() {
    var percentage = calculatePercentage();
    var pieChart = document.getElementById('chart');
    pieChart.style.background = `conic-gradient(yellow ${percentage}%, green ${100 - percentage}%)`;
}

function handleCheckbox(noteId) {
    var checkbox = document.getElementById(noteId);
    var note = notes.find(note => note.id === noteId);

    if (note) {
        note.status = checkbox.checked;
        controlChart()
    }
}

function changeNote(noteId) {
    var note = notes.find(note => note.id === noteId);
    showInput(3)
    document.getElementById('inp').value = note.noteText
    document.getElementById('groupSelect').value = note.selectedGroup
    document.getElementById('tagSelect').value = note.selectedTag
    document.getElementById('meeting-time').value = note.meetingTime
}