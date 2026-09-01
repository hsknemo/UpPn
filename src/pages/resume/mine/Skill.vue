<script setup>
import TitleContent from "p/resume/compo/TitleContent.vue";
import SkillIcon from "p/resume/icon/SkillIcon.vue";
import FrontEndSkill from "p/resume/mine/FrontEndSkill.vue";
import BackEndSkill from "p/resume/mine/BackEndSkill.vue";
</script>

<template>
  <TitleContent
      title="技能"
      engTitle="SKILL"
  >
    <template #icon>
      <SkillIcon></SkillIcon>
    </template>

    <template #content>
      <FrontEndSkill />
      <BackEndSkill />
    </template>
  </TitleContent>
</template>


