---
layout: research-page
title: Projects
permalink: /projects/
nav_key: projects
description: Zewei Zhang's research on adapting motion priors through CPG parameter optimization, residual policies, and terrain-aware motion generation.
---
<header class="page-heading">
  <h1>Projects</h1>
  <p>{{ site.data.research.story.intro }}</p>
</header>
<nav class="project-index" aria-label="Research studies">
  {% for study in site.data.research.story.studies %}<a href="#{{ study.id }}">{{ study.short_title }}</a>{% endfor %}
</nav>
{% for study in site.data.research.story.studies %}
  {% assign paper = site.data.research.papers | where: 'id', study.paper_id | first %}
  <article class="project-study" id="{{ study.id }}">
    <figure class="project-media">
      <div class="project-frame{% if study.id == 'rhythms' %} project-cpg{% endif %}">
        <video class="experiment-video" muted loop playsinline controls preload="none" poster="{{ paper.poster | relative_url }}" aria-label="{{ paper.media_alt | escape }}"><source src="{{ paper.preview | relative_url }}" type="video/mp4"></video>
      </div>
      <figcaption>{{ study.robot }} · {{ paper.venue }} {{ paper.year }}</figcaption>
    </figure>
    <div class="project-copy">
      <p class="project-meta">{{ paper.year }} · {{ study.lab }}</p>
      <h2>{{ study.title }}</h2>
      {% for paragraph in study.paragraphs %}<p>{{ paragraph }}</p>{% endfor %}
      <dl class="project-facts"><dt>Prior</dt><dd>{{ study.prior }}</dd><dt>Adaptation</dt><dd>{{ study.adaptation }}</dd><dt>Robot</dt><dd>{{ study.robot }}</dd></dl>
      <div class="related-paper"><span>Related paper</span><a href="{{ '/papers/' | relative_url }}#{{ paper.id }}">{{ paper.title }}</a></div>
      {% if paper.project_url %}<a class="external-project" href="{{ paper.project_url }}">Full project page ↗</a>{% endif %}
    </div>
  </article>
{% endfor %}
<section class="related-collaboration" aria-labelledby="related-collaboration-title">
  <h2 id="related-collaboration-title">Related collaboration</h2>
  {% assign collaboration = site.data.research.papers | where: 'id', 'acp' | first %}
  <article class="project-collaboration" id="acp">
    <p class="project-meta">{{ collaboration.year }} · {{ collaboration.venue }} · {{ collaboration.status }} · <span class="author-role">Coauthor</span></p>
    <h3><a href="{{ collaboration.paper_url }}">{{ collaboration.title }}</a></h3>
    <p class="authors">{% for author in collaboration.authors %}{% if author == 'Zewei Zhang' %}<strong>{{ author }}</strong>{% else %}{{ author }}{% endif %}{% unless forloop.last %}, {% endunless %}{% endfor %}</p>
    <p class="summary">{{ collaboration.summary }}</p>
    <div class="paper-links"><a href="{{ collaboration.paper_url }}">Paper</a><a href="{{ collaboration.project_url }}">Project</a></div>
  </article>
</section>
<section class="project-earlier" aria-labelledby="earlier-projects-title">
  <h2 id="earlier-projects-title">Earlier projects</h2>
  <ul><li><a href="{{ '/cpg_rl.html' | relative_url }}">Reinforcement learning for quadruped locomotion with CPGs</a></li><li><a href="https://www.youtube.com/watch?v=Zbv3JhjAxHA">Drone navigation with onboard sensors</a></li></ul>
</section>
