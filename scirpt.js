// Inisialisasi Slider Utama (Hanya berjalan jika elemen .main-slider ada di halaman)
const mainSliderElement = document.querySelector('.main-slider');
if (mainSliderElement) {
    const mainSlider = new Swiper(mainSliderElement, {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}


// Inisialisasi Slider untuk setiap kategori (Hanya berjalan jika elemen .item-slider ada di halaman)
const itemSliderElements = document.querySelectorAll('.item-slider');
if (itemSliderElements.length > 0) {
    itemSliderElements.forEach(sliderElement => {
        new Swiper(sliderElement, {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
            }
        });
    });
}


// --- START: Kode Peta Leaflet (Hanya berjalan jika elemen #map ada di halaman) ---
const mapElement = document.getElementById('map');
if (mapElement) { // Cek apakah elemen peta ada di DOM

    const map = L.map('map').setView([-2.548926, 118.0148634], 5); // Tengah Indonesia

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const rumahIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', // Contoh ikon rumah
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    const tanahIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/108/108620.png', // Contoh ikon tanah
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    // Mengambil data properti langsung dari HTML
    const propertyListings = document.querySelectorAll('.property-listing');

    propertyListings.forEach(listing => {
        const lat = parseFloat(listing.dataset.lat);
        const lon = parseFloat(listing.dataset.lon);
        const name = listing.dataset.name;
        const address = listing.dataset.address;
        const type = listing.dataset.type;
        // Mengambil URL gambar dari elemen img di dalam listing
        const imageUrl = listing.querySelector('.property-image').src;

        let iconToUse;
        if (type === 'rumah') {
            iconToUse = rumahIcon;
        } else if (type === 'tanah') {
            iconToUse = tanahIcon;
        } else {
            iconToUse = L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/359/359998.png', // Ikon pin lokasi umum
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40]
            });
        }

        const marker = L.marker([lat, lon], { icon: iconToUse }).addTo(map);
        marker.bindPopup(`
            <b>${name}</b><br>
            ${address}<br>
            <img src="${imageUrl}" alt="${name}" style="width:100%; height:auto; margin-top:10px; max-width:200px; border-radius:5px;">
        `);
    });
    // ... (Kode Swiper dan inisialisasi peta di atasnya sama) ...

// --- START: Kode Peta Leaflet (Hanya berjalan jika elemen #map ada di halaman) ---
const mapElement = document.getElementById('map');
if (mapElement) { // Cek apakah elemen peta ada di DOM

    const map = L.map('map').setView([-2.548926, 118.0148634], 5); // Tengah Indonesia

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const rumahIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', // Contoh ikon rumah
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    const tanahIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/108/108620.png', // Contoh ikon tanah
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    // Tambahan: Ikon untuk Jasa
    const jasaIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // Contoh ikon kunci pas (tools/service)
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    // Mengambil data properti/jasa langsung dari HTML
    const listings = document.querySelectorAll('.property-listing'); // Ubah dari propertyListings menjadi listings agar lebih umum

    listings.forEach(listing => {
        const lat = parseFloat(listing.dataset.lat);
        const lon = parseFloat(listing.dataset.lon);
        const name = listing.dataset.name;
        const address = listing.dataset.address;
        const type = listing.dataset.type;
        const imageUrl = listing.querySelector('.property-image').src;

        let iconToUse;
        if (type === 'rumah') {
            iconToUse = rumahIcon;
        } else if (type === 'tanah') {
            iconToUse = tanahIcon;
        } else if (type === 'jasa' || type.startsWith('jasa_')) { // Menggunakan startsWith untuk tipe spesifik jasa
            iconToUse = jasaIcon;
        } else {
            iconToUse = L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/359/359998.png', // Ikon pin lokasi umum
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40]
            });
        }

        const marker = L.marker([lat, lon], { icon: iconToUse }).addTo(map);
        marker.bindPopup(`
            <b>${name}</b><br>
            ${address}<br>
            <img src="${imageUrl}" alt="${name}" style="width:100%; height:auto; margin-top:10px; max-width:200px; border-radius:5px;">
        `);
    });

    // Fungsionalitas tombol "Lihat di Peta"
    document.querySelectorAll('.show-on-map').forEach(button => {
        button.addEventListener('click', function() {
            const lat = parseFloat(this.dataset.targetLat);
            const lon = parseFloat(this.dataset.targetLon);
            const targetLatLng = L.latLng(lat, lon);

            map.flyTo(targetLatLng, 16, {duration: 1.5});
            
            setTimeout(() => {
                map.eachLayer(function(layer) {
                    if (layer instanceof L.Marker) {
                        if (Math.abs(layer.getLatLng().lat - lat) < 0.000001 && Math.abs(layer.getLatLng().lng - lon) < 0.000001) {
                            layer.openPopup();
                        }
                    }
                });
            }, 1500);
        });
    });

} // Akhir dari cek if (mapElement)
// --- END: Kode Peta Leaflet ---


    // Fungsionalitas tombol "Lihat di Peta"
    document.querySelectorAll('.show-on-map').forEach(button => {
        button.addEventListener('click', function() {
            const lat = parseFloat(this.dataset.targetLat);
            const lon = parseFloat(this.dataset.targetLon);
            const targetLatLng = L.latLng(lat, lon);

            map.flyTo(targetLatLng, 16, {duration: 1.5});
            
            setTimeout(() => {
                map.eachLayer(function(layer) {
                    if (layer instanceof L.Marker) {
                        if (Math.abs(layer.getLatLng().lat - lat) < 0.000001 && Math.abs(layer.getLatLng().lng - lon) < 0.000001) {
                            layer.openPopup();
                        }
                    }
                });
            }, 1500);
        });
    });

} // Akhir dari cek if (mapElement)
// --- END: Kode Peta Leaflet ---
