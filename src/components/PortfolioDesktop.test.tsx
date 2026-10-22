import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import PortfolioDesktop from './PortfolioDesktop'
import { projects } from '../data/projects'

describe('PortfolioDesktop navigation and project cases', () => {
  const getShortcut = (id: string) => document.getElementById(`os-shortcut-${id}`) as HTMLButtonElement

  afterEach(() => {
    localStorage.clear()
  })

  it('opens documented project cases, screenshots, and verified project links', async () => {
    render(<PortfolioDesktop />)

    fireEvent.click(getShortcut('projects'))

    expect(screen.getByRole('dialog', { name: /Projetos/ })).toBeVisible()
    expect(screen.getByRole('group', { name: 'Filtrar projetos' })).toBeVisible()
    expect(screen.getByText('3 projetos encontrados')).toBeVisible()

    fireEvent.click(screen.getByText('Ver estudo de caso: FreelaFlow', { selector: 'summary' }))

    expect(screen.getByText(/O README documenta cadastro e login/)).toBeVisible()
    expect(screen.getByText(/A captura disponível mostra o dashboard sem dados/)).toBeVisible()
    expect(screen.getByRole('link', { name: /Código de FreelaFlow no GitHub/ })).toHaveAttribute('href', projects[2].github)
    expect(screen.getByRole('link', { name: /Demo \(login\) de FreelaFlow/ })).toHaveAttribute('href', projects[2].demo)
    expect(screen.getByRole('img', { name: 'Captura de tela: FreelaFlow' })).toHaveAttribute('src', projects[2].image)
  })

  it('filters projects and labels marketing figures as page content', () => {
    render(<PortfolioDesktop />)
    fireEvent.click(getShortcut('projects'))

    const webFilter = screen.getByRole('button', { name: 'WEB' })
    fireEvent.click(webFilter)

    expect(webFilter).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('2 projetos encontrados')).toBeVisible()

    fireEvent.click(screen.getByText('Ver estudo de caso: Landing page Python + IA', { selector: 'summary' }))
    expect(screen.getByText(/Os números de alunos, avaliações e carga horária/)).toBeVisible()
  })

  it('closes the active window with Escape and restores focus to its shortcut', async () => {
    render(<PortfolioDesktop />)
    const terminalShortcut = getShortcut('terminal')

    fireEvent.click(terminalShortcut)
    const terminalDialog = screen.getByRole('dialog', { name: /Terminal/ })
    await waitFor(() => expect(terminalDialog).toHaveFocus())

    fireEvent.keyDown(window, { key: 'Escape' })

    await waitFor(() => expect(screen.queryByRole('dialog', { name: /Terminal/ })).not.toBeInTheDocument())
    await waitFor(() => expect(terminalShortcut).toHaveFocus())
  })

  it('closes the Start menu with Escape and returns focus to its trigger', async () => {
    render(<PortfolioDesktop />)
    const startButton = screen.getByRole('button', { name: 'Abrir menu Iniciar' })

    fireEvent.click(startButton)
    expect(screen.getByRole('navigation', { name: 'Menu Iniciar' })).toBeVisible()

    fireEvent.keyDown(window, { key: 'Escape' })

    await waitFor(() => expect(screen.queryByRole('navigation', { name: 'Menu Iniciar' })).not.toBeInTheDocument())
    await waitFor(() => expect(startButton).toHaveFocus())
  })

  it('runs the about command and activates the About window', async () => {
    render(<PortfolioDesktop />)
    fireEvent.click(getShortcut('terminal'))

    const input = screen.getByLabelText('guest@gustavo:~$')
    fireEvent.change(input, { target: { value: 'about' } })
    fireEvent.submit(input.closest('form')!)

    const aboutDialog = screen.getByRole('dialog', { name: /Sobre mim/ })
    await waitFor(() => expect(aboutDialog).toHaveFocus())
    expect(screen.getByText('Gustavo Silveira Soares — Desenvolvedor Full Stack em Sorocaba/SP.')).toBeVisible()
  })
})
