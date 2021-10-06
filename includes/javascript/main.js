let writeArea = document.querySelector('.timeline-box');
var points, header, maxPoint;

$.getJSON('/includes/json/data.json', function(data) {
    $.each(data, function(key, val) {
        let newEntry = document.createElement('div');
        newEntry.className = "timeline-entry";
        newEntry.id = "timeline-"+key;
        if (key == 0) {
            newEntry.classList.add('active');
        }
        
        writeArea.appendChild(newEntry);

        let newEntryMarker = document.createElement('div');
        newEntryMarker.className = "timeline-marker";
        
        newEntry.appendChild(newEntryMarker);
        
        let newEntryMarkerDot = document.createElement('div');
        newEntryMarkerDot.className = "timeline-dot";

        let newEntryMarkerDate = document.createElement('h3');
        newEntryMarkerDate.className = "timeline-date";
        newEntryMarkerDate.innerText = val.year;

        newEntryMarker.appendChild(newEntryMarkerDot);
        newEntryMarker.appendChild(newEntryMarkerDate);

        updateDesc(0);
    });
    
    points = document.querySelectorAll('.timeline-entry');
    header = document.querySelector('.header-bar').getElementsByTagName('H1')[0];
    maxPoint = points.length;
});

let curPoint = 1;

function changeActive(dir) {
    if (curPoint + dir <= maxPoint && curPoint + dir > 0) {
        for (const point of points) {
            if (point.classList.contains('active')) {
                point.classList.remove('active');
                
                if (dir == 1) {
                    if ((curPoint + 1) <= maxPoint) {
                        let newPoint = point.nextElementSibling;
                        newPoint.classList.add("active");
                        header.innerText = newPoint.getElementsByTagName('H3')[0].innerText;
                        newPoint.scrollIntoView({behavior: "smooth", block: "center"});
                        curPoint ++;

                        updateDesc(newPoint.id.replace('timeline-',''));
                    }
                } else {
                    if ((curPoint - 1) > 0) {
                        let newPoint = point.previousElementSibling;
                        newPoint.classList.add('active');
                        header.innerText = newPoint.getElementsByTagName('H3')[0].innerText;
                        newPoint.scrollIntoView({behavior: "smooth", block: "center"});
                        curPoint --;

                        updateDesc(newPoint.id.replace('timeline-',''));
                    }
                }
                return true;
            }
        }
    } else {
        return false;
    }
}

function updateDesc(id) {
    let descElem = document.querySelector('.desc');
    $.getJSON('/includes/json/data.json', function(data) {
        $.each(data, function(key, val) {
            if (key == id) {
                descElem.innerText = val.desc;
            }
        });
    });
}

document.addEventListener('keydown', function(e) {
    console.log(e.key);
    if (e.key == "ArrowDown" || e.key == "ArrowRight") {
        e.preventDefault();
        changeActive(1);
    } else if (e.key == "ArrowUp" || e.key == "ArrowLeft") {
        e.preventDefault();
        changeActive(-1);
    }
});