document.addEventListener('DOMContentLoaded', () => {
  const data = window.WORKIDO_DATA;

  const heroPills = document.querySelectorAll('.domain-pill');
  const heroSkillLabel = document.getElementById('heroSkillLabel');
  const heroProjectCard = document.querySelector('.project-match-card');
  const heroStudentCard = document.querySelector('.student-profile-preview');

  heroPills.forEach(pill => {
    pill.addEventListener('click', () => {
      heroPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const domainKey = pill.textContent.trim().toLowerCase();
      let domainData;

      if (domainKey.includes('frontend')) domainData = data.heroDomains.frontend;
      else if (domainKey.includes('design')) domainData = data.heroDomains.design;
      else if (domainKey.includes('python')) domainData = data.heroDomains.python;
      else domainData = data.heroDomains.content;

      if (domainData) {
        if (heroSkillLabel) heroSkillLabel.textContent = domainData.skillLabel;

        const pTitle = heroProjectCard.querySelector('.card-project-title');
        const pDesc = heroProjectCard.querySelector('.card-project-desc');
        const pSkills = heroProjectCard.querySelector('.project-skills-list');
        const pBudget = heroProjectCard.querySelector('.meta-value');

        if (pTitle) pTitle.textContent = domainData.title;
        if (pDesc) pDesc.textContent = domainData.desc;
        if (pBudget) pBudget.textContent = domainData.budget;
        if (pSkills) {
          pSkills.innerHTML = domainData.tags.map(t => `<span class="skill-tag">${t}</span>`).join('');
        }

        const sName = heroStudentCard.querySelector('.profile-name');
        const sRole = heroStudentCard.querySelector('.profile-role');
        const sCollege = heroStudentCard.querySelector('.profile-college');
        const sAvatar = heroStudentCard.querySelector('.profile-avatar');
        const sWorkName = heroStudentCard.querySelector('.work-name');
        const sWorkClient = heroStudentCard.querySelector('.work-client');

        if (sName) sName.textContent = domainData.student.name;
        if (sRole) sRole.textContent = domainData.student.role;
        if (sCollege) sCollege.textContent = domainData.student.college;
        if (sAvatar) sAvatar.textContent = domainData.student.initials;
        if (sWorkName) sWorkName.textContent = domainData.student.recentWork;
        if (sWorkClient) sWorkClient.textContent = domainData.student.client;
      }
    });
  });

  const trackTabs = document.querySelectorAll('.track-tab');
  const jStep1Desc = document.getElementById('jStep1Desc');
  const jStep1Val = document.getElementById('jStep1Val');
  const jStep2Desc = document.getElementById('jStep2Desc');
  const jStep2Val = document.getElementById('jStep2Val');
  const jStep3Desc = document.getElementById('jStep3Desc');
  const jStep3Val = document.getElementById('jStep3Val');
  const jStep4Desc = document.getElementById('jStep4Desc');
  const jStep4Val = document.getElementById('jStep4Val');

  trackTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      trackTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const track = tab.getAttribute('data-track');
      const trackInfo = data.transformationTracks[track];

      if (trackInfo) {
        if (jStep1Desc) jStep1Desc.textContent = trackInfo.step1Desc;
        if (jStep1Val) jStep1Val.textContent = trackInfo.step1Val;
        if (jStep2Desc) jStep2Desc.textContent = trackInfo.step2Desc;
        if (jStep2Val) jStep2Val.textContent = trackInfo.step2Val;
        if (jStep3Desc) jStep3Desc.textContent = trackInfo.step3Desc;
        if (jStep3Val) jStep3Val.textContent = trackInfo.step3Val;
        if (jStep4Desc) jStep4Desc.textContent = trackInfo.step4Desc;
        if (jStep4Val) jStep4Val.textContent = trackInfo.step4Val;
      }
    });
  });

  const stageNavItems = document.querySelectorAll('.stage-nav-item');
  const stageIndicatorTag = document.getElementById('stageIndicatorTag');
  const stageDisplayTitle = document.getElementById('stageDisplayTitle');
  const stageDisplayPara = document.getElementById('stageDisplayPara');
  const stageVisualSlot = document.getElementById('stageVisualSlot');
  const takeaway1 = document.getElementById('takeaway1');
  const takeaway2 = document.getElementById('takeaway2');

  function updateStage(index) {
    stageNavItems.forEach((item, i) => {
      if (i === index) item.classList.add('active');
      else item.classList.remove('active');
    });

    const s = data.fourStages[index];
    if (s) {
      if (stageIndicatorTag) stageIndicatorTag.textContent = s.indicator;
      if (stageDisplayTitle) stageDisplayTitle.textContent = s.title;
      if (stageDisplayPara) stageDisplayPara.textContent = s.para;
      if (stageVisualSlot) stageVisualSlot.innerHTML = s.visualHTML;
      if (takeaway1) takeaway1.textContent = s.takeaway1;
      if (takeaway2) takeaway2.textContent = s.takeaway2;
    }
  }

  stageNavItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      updateStage(idx);
    });
  });

  const filterPills = document.querySelectorAll('.filter-pill');
  const gigCards = document.querySelectorAll('.gig-card');
  const activeCountLabel = document.getElementById('activeProjectCount');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-filter');
      let visibleCount = 0;

      gigCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (activeCountLabel) {
        activeCountLabel.textContent = `Showing ${visibleCount} curated student gig${visibleCount === 1 ? '' : 's'}`;
      }
    });
  });

  const hoursRange = document.getElementById('hoursRange');
  const hoursVal = document.getElementById('hoursVal');
  const calcChips = document.querySelectorAll('.calc-chip');
  const estProjects = document.getElementById('estProjects');
  const estEarnings = document.getElementById('estEarnings');

  let selectedRate = 12000;

  function calculateEstimates() {
    const hours = parseInt(hoursRange.value, 10);
    if (hoursVal) hoursVal.textContent = `${hours} hours / week`;

    let projectCount = 1;
    if (hours >= 10 && hours < 18) projectCount = 2;
    else if (hours >= 18) projectCount = 3;

    const minEarn = projectCount * selectedRate;
    const maxEarn = Math.round(minEarn * 1.25);

    if (estProjects) estProjects.textContent = `${projectCount} Project${projectCount > 1 ? 's' : ''} / mo`;
    if (estEarnings) estEarnings.textContent = `₹${minEarn.toLocaleString('en-IN')} – ₹${maxEarn.toLocaleString('en-IN')}`;
  }

  if (hoursRange) {
    hoursRange.addEventListener('input', calculateEstimates);
  }

  calcChips.forEach(chip => {
    chip.addEventListener('click', () => {
      calcChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedRate = parseInt(chip.getAttribute('data-rate'), 10);
      calculateEstimates();
    });
  });

  const projectModal = document.getElementById('projectModal');
  const joinModal = document.getElementById('joinModal');
  const closeProjectModal = document.getElementById('closeProjectModal');
  const cancelProjectModal = document.getElementById('cancelProjectModal');
  const closeJoinModal = document.getElementById('closeJoinModal');
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  const applyProjectBtns = document.querySelectorAll('.apply-project-btn');
  const heroApplyBtn = document.getElementById('heroApplyBtn');
  const openStudentModalBtn = document.getElementById('openStudentModalBtn');
  const openClientModalBtn = document.getElementById('openClientModalBtn');
  const postProjectModalBtn = document.getElementById('postProjectModalBtn');
  const loginBtn = document.getElementById('loginBtn');
  const submitApplyBtn = document.getElementById('submitApplyBtn');
  const joinForm = document.getElementById('joinForm');

  function showToast(msg) {
    if (toastMessage) toastMessage.textContent = msg;
    if (toastNotice) {
      toastNotice.classList.add('show');
      setTimeout(() => {
        toastNotice.classList.remove('show');
      }, 3500);
    }
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openProjectDetails(projectId) {
    const project = data.projects.find(p => p.id === parseInt(projectId, 10)) || data.projects[0];
    
    document.getElementById('modalProjectTag').textContent = project.tag;
    document.getElementById('modalProjectTitle').textContent = project.title;
    document.getElementById('modalProjectBudget').textContent = project.budget;
    document.getElementById('modalProjectTimeline').textContent = project.timeline;
    document.getElementById('modalProjectClient').textContent = project.client;
    document.getElementById('modalProjectDesc').textContent = project.desc;
    
    const tagsContainer = document.getElementById('modalProjectTags');
    if (tagsContainer) {
      tagsContainer.innerHTML = project.skills.map(s => `<span class="skill-tag">${s}</span>`).join('');
    }

    openModal(projectModal);
  }

  applyProjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-project-id');
      openProjectDetails(pid);
    });
  });

  if (heroApplyBtn) {
    heroApplyBtn.addEventListener('click', () => {
      openProjectDetails(1);
    });
  }

  if (closeProjectModal) closeProjectModal.addEventListener('click', () => closeModal(projectModal));
  if (cancelProjectModal) cancelProjectModal.addEventListener('click', () => closeModal(projectModal));
  if (closeJoinModal) closeJoinModal.addEventListener('click', () => closeModal(joinModal));

  window.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal(projectModal);
    if (e.target === joinModal) closeModal(joinModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(projectModal);
      closeModal(joinModal);
    }
  });

  if (openStudentModalBtn) {
    openStudentModalBtn.addEventListener('click', () => {
      document.getElementById('joinModalTitle').textContent = "Join as a Student";
      document.getElementById('joinModalSub').textContent = "Turn your academic skills into verified work, milestone earnings, and portfolio proof.";
      openModal(joinModal);
    });
  }

  if (openClientModalBtn) {
    openClientModalBtn.addEventListener('click', () => {
      document.getElementById('joinModalTitle').textContent = "Hire Student Talent";
      document.getElementById('joinModalSub').textContent = "Post a deliverable-scoped milestone project and review verified coursework & repos.";
      openModal(joinModal);
    });
  }

  if (postProjectModalBtn) {
    postProjectModalBtn.addEventListener('click', () => {
      document.getElementById('joinModalTitle').textContent = "Post a Scoped Milestone";
      document.getElementById('joinModalSub').textContent = "Describe your project deliverable, set your budget (e.g. ₹10,000), and find vetted students.";
      openModal(joinModal);
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      document.getElementById('joinModalTitle').textContent = "Log In to Workido";
      document.getElementById('joinModalSub').textContent = "Welcome back! Access your active project milestones and messages.";
      openModal(joinModal);
    });
  }

  if (submitApplyBtn) {
    submitApplyBtn.addEventListener('click', () => {
      closeModal(projectModal);
      showToast("Application submitted! The client will review your verified profile.");
    });
  }

  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(joinModal);
      showToast("Welcome to Workido! Your profile setup is ready.");
    });
  }
});
