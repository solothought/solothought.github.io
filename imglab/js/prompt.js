// Add this array at the top of your prompt.js file
const ads = [
    {
      image: 'https://solothought.com/products/assets/images/wishin/YouTubeThumbnail.png',
      url: 'https://play.google.com/store/apps/details?id=com.solothought.wishin',
      alt: 'Wishin Product'
    },
    {
      image: 'https://solothought.com/products/assets/images/wishin/self-doubt-evidence.png',
      url: 'https://play.google.com/store/apps/details?id=com.solothought.wishin',
      alt: 'Wishin Product'
    },
    {
      image: 'https://solothought.com/products/assets/images/wishin/WishIn_ad_banner.png',
      url: 'https://play.google.com/store/apps/details?id=com.solothought.wishin',
      alt: 'Wishin Product'
    },
    {
      image: 'https://solothought.com/products/assets/images/wishin/inner-proof.png',
      url: 'https://play.google.com/store/apps/details?id=com.solothought.wishin',
      alt: 'Wishin Product'
    },
    {
      image: 'https://solothought.com/products/assets/images/wishin/old-habit.png',
      url: 'https://play.google.com/store/apps/details?id=com.solothought.wishin',
      alt: 'Wishin Product'
    },
    {
      image: 'https://solothought.com/products/assets/images/wishin/reason-for-habit.png',
      url: 'https://play.google.com/store/apps/details?id=com.solothought.wishin',
      alt: 'Wishin Product'
    },
    {
      image: 'https://solothought.com/products/assets/images/wishin/together-memories-give-strength.png',
      url: 'https://play.google.com/store/apps/details?id=com.solothought.wishin',
      alt: 'Wishin Product'
    },
];

// Function to get random ad
function getRandomAd() {
  return ads[Math.floor(Math.random() * ads.length)];
}

// Function to check if ad should be shown today
function shouldShowAd() {
  const lastShown = localStorage.getItem('adLastShown');
  const today = new Date().toDateString();
  return lastShown !== today;
}

// Function to show the ad popup
function showAdPopup(selectedAd, callback) {
  $.confirm({
    title: "",
    content: `
      <div style="text-align: center; padding: 20px;">
        <a href="${selectedAd.url}" target="_blank" onclick="logAdClick('${selectedAd.url}')">
          <img src="${selectedAd.image}" 
               alt="${selectedAd.alt}" 
               style="max-width: 100%; height: auto; cursor: pointer; border-radius: 8px;" />
        </a>
      </div>
    `,
    escapeKey: true,
    backgroundDismiss: true,
    useBootstrap: false,
    boxWidth: 600,
    buttons: {
      continue: {
        text: "Continue",
        action: function () {
          // Save that ad was shown today
          localStorage.setItem('adLastShown', new Date().toDateString());
          // Call the callback to show features
          callback();
        },
      },
      close: {
        text: "Close",
        action: function () {
          // Save that ad was shown today even if closed
          localStorage.setItem('adLastShown', new Date().toDateString());
        },
      },
    },
  });
}

// Function to show the features popup
function showFeaturesPopup() {
  $.confirm({
    title: "",
    content: `
        <div id="featurepopup">
          <div class="row text-center">
              <div class="col-md-4 col-sm-6">
                  <i class="icon-github-circled featureicon" style="font-size: 48px;"></i>
                  <div class="summary" style="font-size: 13px;">
                      Free & Open source
                      <a class="github-button" href="https://github.com/NaturalIntelligence/imglab" data-size="large" data-show-count="true" aria-label="Star NaturalIntelligence/imglab on GitHub">Star</a>
                  </div>
              </div>
              <div class="col-md-4 col-sm-6">
                  <i class="icon-user-secret featureicon" style="font-size: 48px;"></i>
                  <div class="summary" style="font-size: 13px;">Your images and data are safe, they are saved locally</div>
              </div>
              <div class="col-md-4 col-sm-6">
                  <i class="icon-object-group featureicon" style="font-size: 48px;"></i>
                  <div class="summary" style="font-size: 13px;">Multiple label types: point, circle, boundary box, polygon</div>
              </div>
          </div>
          <div class="row text-center">
              <div class="col-md-4 col-sm-6">
                  <i class="icon-mouse-pointer featureicon" style="font-size: 48px;"></i>
                  <div class="summary" style="font-size: 13px;">1 click face landmarking</div>
              </div>
              <div class="col-md-4 col-sm-6">
                  <i class="icon-firefox featureicon" style="font-size: 48px;"></i>
                  <div class="summary" style="font-size: 13px;">No installation, works in your browser</div>
              </div>
              <div class="col-md-4 col-sm-6">
                  <i class="icon-doc-text featureicon" style="font-size: 48px;"></i>
                  <div class="summary" style="font-size: 13px;">Multiple supported formats: dlib XML, dlib pts, Pascal VOC, COCO ..</div>
              </div>
          </div>
          <div class="row text-center">
              <div class="col-md-4 col-sm-6">
                  <i class="icon-tags featureicon" style="font-size: 48px;"></i>
                  <div class="summary" style="font-size: 13px;">Multiple label types including name, category, tags</div>
              </div>
              <div class="col-md-4 col-sm-6">
                  <i class="icon-emo-thumbsup featureicon" style="font-size: 48px;"></i>
                  <div class="summary" style="font-size: 13px;">Better user experience with features like autofill, hotkeys, cut & paste labels...</div>
              </div>
              <div class="col-md-4 col-sm-6">
                  <i class="icon-globe featureicon" style="font-size: 48px;"></i>
                  <div class="summary" style="font-size: 13px;">Trusted by users from 45+ countries</div>
              </div>
          </div>
          <div class="row text-center">
              <div class="col-md-4 col-sm-6">
                  <i class="icon-laptop featureicon" style="font-size: 48px;"></i>
                  <div class="summary" style="font-size: 13px;">Basic IDE features: zoom in/out, light, move, image thumbnails, drag ...</div>
              </div>
              <div class="col-md-4 col-sm-6">
                  <div class="featureicon">
                      <img src="img/icons/Offline_logo.svg" width="48px" />
                  </div>
                  <div class="summary" style="font-size: 13px;">Works offline</div>
              </div>
              <div class="col-md-4 col-sm-6">
                  <i class="icon-picture featureicon" style="font-size: 48px;"></i>
                  <div class="summary" style="font-size: 13px;">0.5 millions images annotated monthly</div>
              </div>
          </div>
        </div>
        `,
    escapeKey: true,
    backgroundDismiss: true,
    useBootstrap: false,
    boxWidth: 900,
    buttons: {
      confirm: {
        text: "Donate",
        action: function () {
          displayDonationPrompt();
        },
      },
      leave: {
        text: "Umm, maybe next time!",
      },
    },
  });
}

// Main initialization - show ad first, then features
$(function () {
  const showAd = shouldShowAd();
  
  if (showAd) {
    const selectedAd = getRandomAd();
    // Show ad first, then features popup
    showAdPopup(selectedAd, showFeaturesPopup);
  } else {
    // If no ad, just show features
    showFeaturesPopup();
  }
});

// Optional: Track ad clicks
function logAdClick(url) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'click', {
      event_category: 'ad',
      event_label: url,
      transport_type: 'beacon'
    });
  }
}

function displayDonationPrompt() {
  $.dialog({
    title: "Donate",
    content: `<div style="text-align:center;">
                <div><a onclick="javascript:logPaypal()" href="https://paypal.me/naturalintelligence" target="_blank"><img src="img/support_paypal.svg" width="200px"></a></div>
            </div>`,
    escapeKey: true,
    backgroundDismiss: true,
  });
}

function logPaypal() {
  gtag("event", "click", {
    event_category: "outbound",
    event_label: "paypal",
    transport_type: "beacon",
  });
}