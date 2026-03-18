import React, { useState } from 'react'
import { useGame } from '../../../context/GameContext'
import styles from './ProjectSubmission.module.css'

export default function ProjectSubmission({ course }) {
  const { submitProject } = useGame()
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [githubLink, setGithubLink] = useState('')
  const [deployedLink, setDeployedLink] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!projectName || !description || !githubLink || !deployedLink) return

    submitProject({
      projectName,
      description,
      githubLink,
      deployedLink,
      course,
    })

    setSubmitted(true)
  }

  return (
    <div className={styles.projectSubmission}>
      <h2>Project Submission</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label>
            Project Name
            <input value={projectName} onChange={e => setProjectName(e.target.value)} required />
          </label>
          <label>
            Project Description
            <textarea value={description} onChange={e => setDescription(e.target.value)} required />
          </label>
          <label>
            GitHub Link
            <input type="url" value={githubLink} onChange={e => setGithubLink(e.target.value)} required />
          </label>
          <label>
            Deployed Link
            <input type="url" value={deployedLink} onChange={e => setDeployedLink(e.target.value)} required />
          </label>
          <button type="submit">Submit Project</button>
        </form>
      ) : (
        <div className={styles.success}>✅ Project submitted successfully! Certificate is generated in your profile.</div>
      )}
    </div>
  )
}
