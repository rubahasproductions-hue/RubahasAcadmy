document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            navIcon.classList.replace('ph-list', 'ph-x');
        } else {
            navIcon.classList.replace('ph-x', 'ph-list');
        }
    });

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navIcon.classList.replace('ph-x', 'ph-list');
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => scrollObserver.observe(el));

    // 4. Registration Form to WhatsApp Submission
    const form = document.getElementById('registrationForm');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'براہ کرم انتظار کریں...';
        submitBtn.disabled = true;

        // Get Form Values
        const fullName = document.getElementById('fullName').value;
        const fatherName = document.getElementById('fatherName').value;
        const whatsappNo = document.getElementById('whatsapp').value;
        const qualification = document.getElementById('qualification').value;

        const courseSelect = document.getElementById('course');
        const course = courseSelect.options[courseSelect.selectedIndex].text;

        const message = document.getElementById('message').value;

        // Format Message for WhatsApp
        let waMessage = `*رباحاز اکیڈمی - نیا داخلہ فارم*\n\n`;
        waMessage += `*نام:* ${fullName}\n`;
        waMessage += `*والد کا نام:* ${fatherName}\n`;
        waMessage += `*واٹس ایپ نمبر:* ${whatsappNo}\n`;
        waMessage += `*تعلیم:* ${qualification}\n`;
        waMessage += `*کورس:* ${course}\n`;

        if (message.trim() !== '') {
            waMessage += `\n*پیغام:*\n${message}`;
        }

        // Encode message for URL
        const encodedMessage = encodeURIComponent(waMessage);
        const academyNumber = '923136262321';
        const waUrl = `https://wa.me/${academyNumber}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(waUrl, '_blank');

        // Reset and Show Success Status
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
            formStatus.innerHTML = '<p style="color: #25d366; text-align: center; margin-top: 1rem; font-weight: 600;">آپ کی درخواست کامیابی سے واٹس ایپ پر بھیج دی گئی ہے!</p>';

            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        }, 1000);
    });

    // 5. Populate Marquees (Islamic Knowledge & Reviews)
    const knowledgeData = [
        { title: 'قرآنی دعا', text: 'رَبِّ زِدْنِیْ عِلْمًا (اے میرے رب! میرے علم میں اضافہ فرما)' },
        { title: 'حدیثِ نبویﷺ', text: 'تم میں سے بہترین وہ ہے جو قرآن سیکھے اور سکھائے۔' },
        { title: 'علم کی فضیلت', text: 'علم حاصل کرنا ہر مسلمان مرد اور عورت پر فرض ہے۔' },
        { title: 'تجوید کا اصول', text: 'حروف کو ان کے صحیح مخارج سے ادا کرنا تجوید کہلاتا ہے۔' },
        { title: 'سنہری قول', text: 'وقت کی قدر کرو، کیونکہ جو وقت گزر گیا وہ کبھی لوٹ کر نہیں آتا۔' },
        { title: 'قرآنی پیغام', text: 'بیشک اللہ صبر کرنے والوں کے ساتھ ہے۔' },
        { title: 'حدیثِ نبویﷺ', text: 'دین آسان ہے، جو شخص دین میں سختی کرے گا، دین اس پر غالب آ جائے گا۔' },
        { title: 'تفسیر کا نکتہ', text: 'سورۃ الفاتحہ کو ام الکتاب (کتاب کی ماں) کہا جاتا ہے۔' },
        { title: 'اردو ادب', text: 'الفاظ وہ تیر ہیں جو کمان سے نکلیں تو واپس نہیں آتے۔ (واصف علی واصف)' },
        { title: 'حکمت کی بات', text: 'جو شخص اپنے غصے پر قابو پاتا ہے، وہ سب سے بہادر ہے۔' },
        { title: 'قرآنی دعا', text: 'رَبَّنَا آتِنَا فِی الدُّنْیَا حَسَنَةً وَّفِی الآخِرَةِ حَسَنَةً وَّقِنَا عَذَابَ النَّارِ' },
        { title: 'حدیثِ نبویﷺ', text: 'مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ رہیں۔' },
        { title: 'تجوید', text: 'غنہ ناک میں آواز چھپانے کو کہتے ہیں، اس کی مقدار دو حرکت ہوتی ہے۔' },
        { title: 'سنہری قول', text: 'علم ایک ایسا خزانہ ہے جسے کوئی چور چرا نہیں سکتا۔' },
        { title: 'اخلاقیات', text: 'راستے سے تکلیف دہ چیز ہٹانا بھی صدقہ ہے۔' },
        { title: 'قرآنی پیغام', text: 'اور تم اپنے پروردگار کی کون کون سی نعمتوں کو جھٹلاؤ گے؟' },
        { title: 'حدیثِ نبویﷺ', text: 'اعمال کا دارومدار نیتوں پر ہے۔' },
        { title: 'اردو ادب', text: 'زندگی زندہ دلی کا نام ہے، مردہ دل کیا خاک جیا کرتے ہیں۔' },
        { title: 'علم کی روشنی', text: 'اندھیرے کو کوسنے سے بہتر ہے کہ ایک شمع جلا دی جائے۔' },
        { title: 'تفسیر', text: 'آیت الکرسی قرآن پاک کی سب سے عظیم آیت ہے۔' },
        { title: 'اسلام کا پیغام', text: 'مسکرانا بھی ایک صدقہ ہے۔' },
        { title: 'قرآنی اصول', text: 'بے شک مشکل کے ساتھ آسانی ہے۔' },
        { title: 'حکمت', text: 'خاموشی غصے کا بہترین علاج ہے۔' },
        { title: 'علامہ اقبال', text: 'خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے، خدا بندے سے خود پوچھے بتا تیری رضا کیا ہے۔' },
        { title: 'قرآنی دعا', text: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي' },
        { title: 'حدیثِ نبویﷺ', text: 'سچائی نیکی کی طرف لے جاتی ہے اور نیکی جنت کی طرف۔' },
        { title: 'ادب کا تقاضا', text: 'با ادب با نصیب، بے ادب بے نصیب۔' },
        { title: 'تجوید کا اصول', text: 'اخفاء کا مطلب حرف کو غنہ کے ساتھ چھپا کر پڑھنا ہے۔' },
        { title: 'سنہری قول', text: 'جو شخص علم کی تلاش میں نکلتا ہے، اللہ اس کے لیے جنت کا راستہ آسان کر دیتا ہے۔' },
        { title: 'والدین کا مقام', text: 'جنت تمہاری ماؤں کے قدموں تلے ہے۔' },
        { title: 'اخلاقیات', text: 'لوگوں کے ساتھ حسن اخلاق سے پیش آؤ۔' }
    ];

    const reviewsData = [
        { name: 'سارہ احمد', course: 'طالبہ، قرآن مع تجوید', text: '"اکیڈمی کا پڑھانے کا انداز انتہائی شاندار ہے۔ اساتذہ بہت محنتی ہیں۔"', avatar: 'س' },
        { name: 'زینب علی', course: 'طالبہ، گرافک ڈیزائننگ', text: '"میں نے یہاں سے گرافک ڈیزائننگ سیکھی۔ کورس کا مواد بہت عملی نوعیت کا ہے۔"', avatar: 'ز' },
        { name: 'ام کلثوم', course: 'طالبہ، اردو ادب', text: '"اردو ادب کی کلاسز نے میری زبان دانی میں نکھار پیدا کیا ہے۔"', avatar: 'ا' },
        { name: 'عائشہ خان', course: 'طالبہ، قرآن مع تجوید', text: '"تجوید کے قواعد بہت آسان طریقے سے سمجھائے جاتے ہیں۔"', avatar: 'ع' },
        { name: 'فاطمہ نور', course: 'طالبہ، کمپیوٹر بیسکس', text: '"کمپیوٹر کی بنیادی مہارتیں سیکھ کر میرا اعتماد بہت بڑھ گیا ہے۔"', avatar: 'ف' },
        { name: 'مریم شاہ', course: 'طالبہ، قرآن مع تجوید', text: '"ماحول بہت پرسکون ہے۔ کلاسز کا وقت بھی بہت مناسب ہے۔"', avatar: 'م' },
        { name: 'خدیجہ طارق', course: 'طالبہ، گرافک ڈیزائننگ', text: '"اساتذہ ہر قدم پر رہنمائی کرتے ہیں۔ بہترین تجربہ رہا۔"', avatar: 'خ' },
        { name: 'ثناء اقبال', course: 'طالبہ، اردو ادب', text: '"اردو شاعری اور نثر کو سمجھنے کا نیا زاویہ ملا۔"', avatar: 'ث' },
        { name: 'ردا بتول', course: 'طالبہ، قرآن مع تجوید', text: '"میری تلاوت میں بہتری آئی ہے۔ الحمدللہ بہترین اکیڈمی ہے۔"', avatar: 'ر' },
        { name: 'ہاجرہ بی بی', course: 'طالبہ، کمپیوٹر بیسکس', text: '"اب میں خود اپنا ڈیجیٹل کام آسانی سے کر لیتی ہوں۔"', avatar: 'ہ' },
        { name: 'نادیہ علی', course: 'طالبہ، گرافک ڈیزائننگ', text: '"ڈیزائننگ کے جدید سافٹ ویئرز پر عبور حاصل ہوا۔"', avatar: 'ن' },
        { name: 'میمونہ سلیم', course: 'طالبہ، قرآن مع تجوید', text: '"اساتذہ کی شفقت اور محنت قابلِ تعریف ہے۔"', avatar: 'م' },
        { name: 'انعم ریاض', course: 'طالبہ، اردو ادب', text: '"اردو گرامر اور املاء کی غلطیاں درست ہوئیں۔"', avatar: 'ا' },
        { name: 'بشریٰ حبیب', course: 'طالبہ، کمپیوٹر بیسکس', text: '"بہت ہی کم وقت میں بہت کچھ سیکھنے کو ملا۔"', avatar: 'ب' },
        { name: 'سمیرا طاہر', course: 'طالبہ، گرافک ڈیزائننگ', text: '"فری لانسنگ کے حوالے سے بھی بہت اچھی ٹپس دی گئیں۔"', avatar: 'س' },
        { name: 'عمارہ خان', course: 'طالبہ، قرآن مع تجوید', text: '"آن لائن حفظ کا تجربہ امید سے کہیں زیادہ بہتر رہا۔"', avatar: 'ع' },
        { name: 'نورین مقصود', course: 'طالبہ، کمپیوٹر بیسکس', text: '"ایم ایس آفس اور ای میل کا درست استعمال سیکھ کر بہت خوش ہوں۔"', avatar: 'ن' },
        { name: 'اقراء رحمان', course: 'طالبہ، اردو ادب', text: '"یہاں آکر مجھے غالب اور اقبال کو صحیح معنوں میں سمجھنے کا موقع ملا۔"', avatar: 'ا' },
        { name: 'مبشرہ بتول', course: 'طالبہ، گرافک ڈیزائننگ', text: '"اسائنمنٹس اور پریکٹیکل کام نے مجھے ایک اچھا ڈیزائنر بننے میں مدد دی۔"', avatar: 'م' },
        { name: 'روبینہ شاہین', course: 'طالبہ، قرآن مع تجوید', text: '"ہر روز نئی چیز سیکھنے کو ملتی ہے۔ اساتذہ کا اخلاق کمال ہے۔"', avatar: 'ر' },
        { name: 'کلثوم اختر', course: 'طالبہ، اردو ادب', text: '"کورس ختم ہونے کے بعد بھی اساتذہ رہنمائی کے لیے موجود رہتے ہیں۔"', avatar: 'ک' },
        { name: 'ہما قریشی', course: 'طالبہ، کمپیوٹر بیسکس', text: '"بیسک کانسیپٹس بہت واضح طریقے سے سمجھائے گئے۔"', avatar: 'ہ' },
        { name: 'ثوبیہ نذیر', course: 'طالبہ، گرافک ڈیزائننگ', text: '"کورس کے بعد مجھے اپنا پہلا آن لائن آرڈر مل گیا۔ الحمدللہ!"', avatar: 'ث' },
        { name: 'صوفیہ بیگم', course: 'طالبہ، قرآن مع تجوید', text: '"میری عمر 50 سال ہے، لیکن اساتذہ نے مجھے بہت پیار اور تحمل سے سکھایا۔"', avatar: 'ص' },
        { name: 'زارا شیخ', course: 'طالبہ، گرافک ڈیزائننگ', text: '"میں نے کئی جگہ سے سیکھنے کی کوشش کی، مگر رباحاز اکیڈمی سب سے منفرد ہے۔"', avatar: 'ز' },
        { name: 'عطیہ نور', course: 'طالبہ، اردو ادب', text: '"تلفظ کی درستی کے لیے یہ کورس ہر کسی کو کرنا چاہیے۔"', avatar: 'ع' },
        { name: 'حلیمہ سعدیہ', course: 'طالبہ، کمپیوٹر بیسکس', text: '"غیر تکنیکی افراد کے لیے یہ کورس ایک نعمت سے کم نہیں۔"', avatar: 'ح' },
        { name: 'طیبہ رحمان', course: 'طالبہ، قرآن مع تجوید', text: '"تجوید کے ساتھ روزانہ تلاوت کر کے دلی سکون ملتا ہے۔"', avatar: 'ط' },
        { name: 'فرزانہ کوثر', course: 'طالبہ، گرافک ڈیزائننگ', text: '"کینوا اور فوٹوشاپ کے کورسز نہایت پروفیشنل اور اپڈیٹڈ ہیں۔"', avatar: 'ف' },
        { name: 'شازیہ منظور', course: 'طالبہ، اردو ادب', text: '"طالبات پر انفرادی توجہ اس اکیڈمی کی سب سے بڑی خوبی ہے۔"', avatar: 'ش' }
    ];

    function renderMarquee(elementId, items, renderItemHTML) {
        try {
            const track = document.getElementById(elementId);
            if (!track) {
                console.warn(`Marquee element not found: ${elementId}`);
                return;
            }

            let htmlContent = '';
            items.forEach(item => {
                htmlContent += renderItemHTML(item);
            });

            // Duplicate content for seamless infinite scrolling
            track.innerHTML = htmlContent + htmlContent;
            console.log(`Successfully rendered marquee: ${elementId}`);
        } catch (e) {
            console.error(`Error rendering marquee ${elementId}:`, e);
        }
    }

    // Render Knowledge Posters
    renderMarquee('knowledgeTrack', knowledgeData, (item) => `
        <div class="card knowledge-card">
            <h4>${item.title}</h4>
            <p>${item.text}</p>
        </div>
    `);

    // Render Reviews
    renderMarquee('reviewsTrack', reviewsData, (item) => `
        <div class="card testimonial-card">
            <div class="quote-icon"><i class="ph-fill ph-quotes"></i></div>
            <p class="feedback">${item.text}</p>
            <div class="student-info">
                <div class="avatar">${item.avatar}</div>
                <div class="details">
                    <h4 style="margin-bottom:0.2rem; font-size:1.1rem;">${item.name}</h4>
                    <span style="font-size:0.85rem; color:var(--color-text-muted);">${item.course}</span>
                </div>
            </div>
        </div>
    `);

    // 6. Theme Toggle (Dark/Light Mode)
    try {
        const themeToggleBtn = document.getElementById('themeToggle');
        if (themeToggleBtn) {
            const themeIcon = themeToggleBtn.querySelector('i');

            // Check for saved theme preference
            const currentTheme = localStorage.getItem('theme');
            if (currentTheme === 'dark') {
                document.body.classList.add('dark-mode');
                if (themeIcon) themeIcon.classList.replace('ph-moon', 'ph-sun');
            }

            themeToggleBtn.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');

                let theme = 'light';
                if (document.body.classList.contains('dark-mode')) {
                    theme = 'dark';
                    if (themeIcon) themeIcon.classList.replace('ph-moon', 'ph-sun');
                } else {
                    if (themeIcon) themeIcon.classList.replace('ph-sun', 'ph-moon');
                }

                // Save preference in local storage
                localStorage.setItem('theme', theme);
            });
        }
    } catch (e) {
        console.error("Error setting up theme toggle:", e);
    }

    // Custom Translate Dropdown Logic
    try {
        const translateBtn = document.getElementById('translateBtn');
        const translateDropdown = document.getElementById('translateDropdown');
        if (translateBtn && translateDropdown) {
            const langOptions = translateDropdown.querySelectorAll('li');
            const currentLangSpan = translateBtn.querySelector('.current-lang');

            // Toggle dropdown
            translateBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                translateDropdown.classList.toggle('active');
            });

            // Close on outside click
            document.addEventListener('click', () => {
                translateDropdown.classList.remove('active');
            });

            // Handle language selection
            langOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const langCode = option.getAttribute('data-lang');
                    const langName = option.textContent.split(' ')[0];

                    const domainStr = window.location.hostname && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' ? `; domain=${window.location.hostname}` : '';

                    // Clear and set cookies
                    if (langCode === 'ur') {
                        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;${domainStr}`;
                        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                    } else {
                        document.cookie = `googtrans=/ur/${langCode}; path=/;${domainStr}`;
                        document.cookie = `googtrans=/ur/${langCode}; path=/;`;
                    }

                    // Save to local storage as fallback for file:// protocol
                    localStorage.setItem('selectedLang', langCode);

                    // Update UI immediately
                    langOptions.forEach(opt => opt.classList.remove('active'));
                    option.classList.add('active');
                    currentLangSpan.textContent = langName;
                    translateDropdown.classList.remove('active');

                    // High-persistence trigger for local browsing
                    let attempts = 0;
                    const maxAttempts = 20; // Increased attempts

                    const tryTranslate = () => {
                        const gtSelect = document.querySelector('.goog-te-combo') || document.querySelector('select.goog-te-combo');
                        if (gtSelect) {
                            gtSelect.value = langCode === 'ur' ? '' : langCode;
                            gtSelect.dispatchEvent(new Event('change'));
                            console.log(`✅ Translation active: ${langCode}`);
                        } else if (attempts < maxAttempts) {
                            attempts++;
                            console.log(`⌛ Attempt ${attempts}: Waiting for Google Translate (Slow on local files)...`);
                            setTimeout(tryTranslate, 500); // 500ms intervals
                        } else {
                            console.warn("❌ Translation failed to load locally.");
                            // If it's a first time, it might need one reload
                            if (!sessionStorage.getItem('reloaded_once')) {
                                sessionStorage.setItem('reloaded_once', 'true');
                                window.location.reload();
                            }
                        }
                    };

                    tryTranslate();
                });
            });

            // Check acting language on load
            const getCookie = (name) => {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            };

            const googtrans = getCookie('googtrans') || localStorage.getItem('selectedLang');
            const activeLang = (googtrans && googtrans.includes('/ur/')) ? googtrans.split('/').pop() :
                (googtrans && googtrans.length <= 3 ? googtrans : 'ur');

            if (activeLang && activeLang !== 'ur') {
                langOptions.forEach(opt => {
                    if (opt.getAttribute('data-lang') === activeLang) {
                        opt.classList.add('active');
                        currentLangSpan.textContent = opt.textContent.split(' ')[0];
                    } else {
                        opt.classList.remove('active');
                    }
                });
            } else {
                const defaultOpt = translateDropdown.querySelector('[data-lang="ur"]');
                if (defaultOpt) {
                    defaultOpt.classList.add('active');
                    currentLangSpan.textContent = defaultOpt.textContent.split(' ')[0];
                }
            }
        }
    } catch (e) {
        console.error("Error setting up translate dropdown:", e);
    }

    // 7. Scroll Progress Bar & Back to Top Button
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        // Scroll Progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';

        // Back to Top Button Visibility
        if (winScroll > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 8. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');

        questionBtn.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
});
