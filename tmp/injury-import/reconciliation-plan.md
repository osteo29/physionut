# Injury Reconciliation Plan

Generated: 2026-04-24T19:56:09.833Z

## Summary
- Deleted junk rows: 2
- Merge alias candidates: 12
- Keep distinct candidates: 39
- Needs manual review: 27

## Deleted Junk Rows
- new-injury-1
- new-injury-79

## Merge Alias Candidates
- Greater Trochanteric Pain Syndrome (GTPS) -> canonical greater_trochanteric_pain_syndrome (duplicate greater_trochanteric_pain_syndrome_gtps)
- Juvenile Osgood-Schlatter -> canonical osgood_schlatter (duplicate juvenile_osgood_schlatter)
- Osgood-Schlatter Disease -> canonical osgood_schlatter (duplicate osgood_schlatter_disease)
- Patellofemoral Pain Syndrome (PFPS) -> canonical patellofemoral_pain (duplicate patellofemoral_pain_syndrome_pfps)
- Peripheral Nerve Injury (Peroneal Nerve Palsy) -> canonical peroneal_nerve_palsy (duplicate peripheral_nerve_injury_peroneal_nerve_palsy)
- Perthes Disease (Rehabilitation) -> canonical perthes_disease (duplicate perthes_disease_rehabilitation)
- Posterior Tibial Tendon Dysfunction (PTTD) -> canonical posterior_tibial_tendon_dysfunction (duplicate posterior_tibial_tendon_dysfunction_pttd)
- Snapping Hip Syndrome (Coxa Saltans) -> canonical snapping_hip_syndrome (duplicate snapping_hip_syndrome_coxa_saltans)
- Thoracic Hyperkyphosis (Postural) -> canonical thoracic_hyperkyphosis (duplicate thoracic_hyperkyphosis_postural)
- Thoracic Outlet Syndrome (TOS) -> canonical thoracic_outlet_syndrome (duplicate thoracic_outlet_syndrome_tos)
- Total Hip Arthroplasty (THA) -> canonical total_hip_arthroplasty (duplicate total_hip_arthroplasty_tha)
- Total Knee Arthroplasty (TKA) -> canonical total_knee_arthroplasty (duplicate total_knee_arthroplasty_tka)

## Keep Distinct Candidates
- AC Joint Sprain (Grade I-II) -> keep distinct from ac_joint_sprain (current duplicate ac_joint_sprain_grade_i_ii)
- ACL Reconstruction (Hamstring Graft) -> keep distinct from acl_reconstruction (current duplicate acl_reconstruction_hamstring_graft)
- ACL Tear - Conservative Management -> keep distinct from acl_injury (current duplicate acl_tear_conservative_management)
- Ankle Fracture ORIF (Post-operative) -> keep distinct from ankle_fracture_orif_rehab (current duplicate ankle_fracture_orif_post_operative)
- Anterior Shoulder Dislocation (First-time) -> keep distinct from glenohumeral_dislocation (current duplicate anterior_shoulder_dislocation_first_time)
- Biceps Rupture - Distal (Post-op) -> keep distinct from distal_biceps_rupture_rehab (current duplicate biceps_rupture_distal_post_op)
- Brachial Plexus Neuropraxia (Burner/Stinger) -> keep distinct from brachial_plexus_neuropraxia (current duplicate brachial_plexus_neuropraxia_burner_stinger)
- Carpal Tunnel Syndrome (Conservative) -> keep distinct from carpal_tunnel_syndrome (current duplicate carpal_tunnel_syndrome_conservative)
- Dupuytren's Contracture (Post-surgical) -> keep distinct from dupuytrens_contracture (current duplicate dupuytren_s_contracture_post_surgical)
- Femoroacetabular Impingement (FAI) - Conservative -> keep distinct from femoroacetabular_impingement (current duplicate femoroacetabular_impingement_fai_conservative)
- Hallux Valgus (Post-surgical Rehabilitation) -> keep distinct from hallux_valgus_rehab (current duplicate hallux_valgus_post_surgical_rehabilitation)
- Hamstring Strain (Grade II) -> keep distinct from hamstring_strain (current duplicate hamstring_strain_grade_ii)
- Hip Labral Tear (Conservative) -> keep distinct from hip_dysplasia_labral_tear (current duplicate hip_labral_tear_conservative)
- Hip Osteoarthritis (Conservative) -> keep distinct from osteoarthritis_flare (current duplicate hip_osteoarthritis_conservative)
- Knee Osteoarthritis (Conservative) -> keep distinct from osteoarthritis_flare (current duplicate knee_osteoarthritis_conservative)
- Lateral Ankle Sprain (Grade I-II) -> keep distinct from ankle_sprain (current duplicate lateral_ankle_sprain_grade_i_ii)
- Little Leaguer's Shoulder (Proximal Humeral Epiphysiolysis) -> keep distinct from little_leaguers_shoulder (current duplicate little_leaguer_s_shoulder_proximal_humeral_epiphysiolysis)
- Lumbar Disc Herniation with Radiculopathy -> keep distinct from lumbar_disc_herniation (current duplicate lumbar_disc_herniation_with_radiculopathy)
- MCL Sprain (Grade II) -> keep distinct from mcl_sprain (current duplicate mcl_sprain_grade_ii)
- Meniscectomy (Post-operative) -> keep distinct from meniscectomy_rehab (current duplicate meniscectomy_post_operative)
- Meniscus Repair (Post-operative) -> keep distinct from meniscus_repair (current duplicate meniscus_repair_post_operative)
- Osteoporotic Vertebral Fracture (Conservative) -> keep distinct from vertebral_fracture (current duplicate osteoporotic_vertebral_fracture_conservative)
- PCL Tear - Conservative -> keep distinct from pcl_injury (current duplicate pcl_tear_conservative)
- Pectoralis Major Tear (Conservative) -> keep distinct from pectoral_strain (current duplicate pectoralis_major_tear_conservative)
- Proximal Humerus Fracture (Non-operative) -> keep distinct from humeral_head_fracture (current duplicate proximal_humerus_fracture_non_operative)
- Quadriceps Strain (Grade II) -> keep distinct from quadriceps_strain (current duplicate quadriceps_strain_grade_ii)
- Rotator Cuff Repair (Post-operative) -> keep distinct from rotator_cuff_repair (current duplicate rotator_cuff_repair_post_operative)
- Scheuermann's Kyphosis (Conservative) -> keep distinct from scheuermanns_kyphosis (current duplicate scheuermann_s_kyphosis_conservative)
- Sever's Disease (Calcaneal Apophysitis) -> keep distinct from severs_disease (current duplicate sever_s_disease_calcaneal_apophysitis)
- SLAP Lesion (Conservative) -> keep distinct from labrum_tear (current duplicate slap_lesion_conservative)
- Spinal Stenosis (Lumbar - Conservative) -> keep distinct from lumbar_spinal_stenosis (current duplicate spinal_stenosis_lumbar_conservative)
- Spondylolisthesis (Grade I - II, Conservative) -> keep distinct from spondylolisthesis (current duplicate spondylolisthesis_grade_i_ii_conservative)
- Stress Reaction (Femoral Neck) -> keep distinct from stress_fracture (current duplicate stress_reaction_femoral_neck)
- Supraspinatus Tear (Partial - Conservative) -> keep distinct from rotator_cuff (current duplicate supraspinatus_tear_partial_conservative)
- TFCC Injury - Triangular Fibrocartilage Complex (Conservative) -> keep distinct from wrist_instability_tfcc (current duplicate tfcc_injury_triangular_fibrocartilage_complex_conservative)
- Tibial Plateau Fracture (Post-op) -> keep distinct from tibial_plateau_fracture_rehab (current duplicate tibial_plateau_fracture_post_op)
- Tibial Stress Fracture (Return to Running) -> keep distinct from stress_fracture (current duplicate tibial_stress_fracture_return_to_running)
- Trigger Finger (Post-injection / Post-op) -> keep distinct from trigger_finger (current duplicate trigger_finger_post_injection_post_op)
- Whiplash Associated Disorder (WAD Grade II) -> keep distinct from whiplash_injury (current duplicate whiplash_associated_disorder_wad_grade_ii)

## Needs Review
- 5th Metatarsal Fracture (Jones Fracture) -> review against jones_fracture_rehab (current duplicate 5th_metatarsal_fracture_jones_fracture)
- Adductor / Groin Strain -> review against adductor_strain (current duplicate adductor_groin_strain)
- Ankle Fracture (Post-immobilisation) -> review against ankle_fracture_rehab (current duplicate ankle_fracture_post_immobilisation)
- Biceps Tendinopathy (Long Head) -> review against biceps_tendinopathy (current duplicate biceps_tendinopathy_long_head)
- Calcific Tendinitis -> review against shoulder_impingement (current duplicate calcific_tendinitis)
- Calf Strain (Gastrocnemius) -> review against calf_strain (current duplicate calf_strain_gastrocnemius)
- Cervical Radiculopathy -> review against cervical_disc_herniation (current duplicate cervical_radiculopathy)
- Complex Regional Pain Syndrome (CRPS Type I) -> review against crps_type_i (current duplicate complex_regional_pain_syndrome_crps_type_i)
- De Quervain's Tenosynovitis -> review against de_quervain_tenosynovitis (current duplicate de_quervain_s_tenosynovitis)
- Distal Radius Fracture (Post-immobilisation) -> review against distal_radius_fracture_rehab (current duplicate distal_radius_fracture_post_immobilisation)
- Facet Joint Dysfunction (Lumbar) -> review against lumbar_facet_joint_dysfunction (current duplicate facet_joint_dysfunction_lumbar)
- Gluteal Muscle Strain -> review against glute_strain (current duplicate gluteal_muscle_strain)
- Hip Flexor Strain (Iliopsoas) -> review against hip_flexor_tendinopathy (current duplicate hip_flexor_strain_iliopsoas)
- Iliotibial Band Syndrome -> review against it_band_syndrome (current duplicate iliotibial_band_syndrome)
- Lateral Epicondylalgia (Tennis Elbow) -> review against lateral_epicondylitis (current duplicate lateral_epicondylalgia_tennis_elbow)
- Medial Epicondylalgia (Golfer's Elbow) -> review against medial_epicondylitis (current duplicate medial_epicondylalgia_golfer_s_elbow)
- Medial Tibial Stress Syndrome (Shin Splints) -> review against shin_splints (current duplicate medial_tibial_stress_syndrome_shin_splints)
- Non-specific Low Back Pain (Acute) -> review against low_back_pain (current duplicate non_specific_low_back_pain_acute)
- Pes Anserine Bursitis -> review against bursitis (current duplicate pes_anserine_bursitis)
- Piriformis Syndrome -> review against sciatica (current duplicate piriformis_syndrome)
- Piriformis Syndrome / Sciatic Nerve Compression -> review against sciatica (current duplicate piriformis_syndrome_sciatic_nerve_compression)
- Posterior Shoulder Instability -> review against glenohumeral_dislocation (current duplicate posterior_shoulder_instability)
- Rectus Femoris Strain -> review against quadriceps_strain (current duplicate rectus_femoris_strain)
- Scaphoid Fracture (Post-immobilisation) -> review against scaphoid_fracture (current duplicate scaphoid_fracture_post_immobilisation)
- Temporomandibular Joint Dysfunction (TMJ) -> review against tmj_disorder (current duplicate temporomandibular_joint_dysfunction_tmj)
- Thumb UCL Sprain (Skier's Thumb) -> review against thumb_collateral_ligament (current duplicate thumb_ucl_sprain_skier_s_thumb)
- UCL Sprain - Elbow (Ulnar Collateral Ligament) -> review against ucl_injury (current duplicate ucl_sprain_elbow_ulnar_collateral_ligament)