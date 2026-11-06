---
layout: research-page
title: Papers
permalink: /papers/
nav_key: papers
description: Publications by Zewei Zhang on legged locomotion and whole-body control, with author lists, publication details, and BibTeX citations.
---
<header class="page-heading">
  <h1>Papers</h1>
  <p>Publications on legged locomotion and whole-body control. The <a href="{{ '/projects/' | relative_url }}">Projects</a> page connects my first-author work through the adaptation of motion priors.</p>
</header>
{% assign years = site.data.research.papers | group_by: 'year' %}
<nav class="year-index" aria-label="Publication years">{% for year in years %}<a href="#year-{{ year.name }}">{{ year.name }}</a>{% endfor %}</nav>
{% for year in years %}
<section class="bibliography-year" id="year-{{ year.name }}" aria-labelledby="heading-{{ year.name }}">
  <h2 id="heading-{{ year.name }}">{{ year.name }}</h2>
  <div class="bibliography-records">
    {% for paper in year.items %}<article class="bibliography-entry" id="{{ paper.id }}">{% include research-record.html paper=paper context='papers' %}</article>{% endfor %}
  </div>
</section>
{% endfor %}
