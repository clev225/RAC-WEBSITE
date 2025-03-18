document.addEventListener('DOMContentLoaded', function() {
    const faqIcon = document.getElementById('faqIcon');
    
    if (faqIcon) {
        faqIcon.addEventListener('click', function() {
            window.location.href = 'FAQs.html';
        });
    }
});

function toggleFAQ(faqItem) {
    const answer = faqItem.querySelector('.faq-answer');
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
      answer.style.padding = '0 10px';
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.padding = '10px';
    }
  }
  
  function filterFAQs() {
    const searchInput = document.getElementById('faq-search').value.toLowerCase();
    const faqItems = document.getElementsByClassName('faq-item');
    let hasResults = false;
    for (let i = 0; i < faqItems.length; i++) {
      const question = faqItems[i].querySelector('h3').textContent.toLowerCase();
      if (question.includes(searchInput)) {
        faqItems[i].style.display = '';
        hasResults = true;
      } else {
        faqItems[i].style.display = 'none';
      }
    }
    document.getElementById('no-results-message').style.display = hasResults ? 'none' : 'block';
  }
  