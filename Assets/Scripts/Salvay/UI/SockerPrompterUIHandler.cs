using System;
using Best.SocketIO;
using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;
using TMPro;

public class SockerPrompterUIHandler : MonoBehaviour, SocketEventListener
{
    [SerializeField]
    private RectTransform popupTransform; // Reference to the UI element's RectTransform
    
    [SerializeField]
    private TMP_Text contentText; // Reference to the UI element's RectTransform
    
    private const float SlideDuration = 0.5f; // Duration for the slide-in and slide-out animations
    private const float StayDuration = 3.0f; // How long the popup stays before sliding back
    private Vector2 m_InitialPosition;
    private Vector2 m_HiddenPosition;

    public enum PopupState
    {
        Hidden,
        Visible,
        Animating
    }

    public PopupState popupState = PopupState.Hidden; // Tracks the current state of the popup

    void Start()
    {
        SocketController.Instance.AddListener(this);
        
        // Store the initial position of the popup
        m_HiddenPosition = popupTransform.anchoredPosition;
        m_InitialPosition = new Vector2(m_HiddenPosition.x, m_HiddenPosition.y + popupTransform.rect.height);

        // Move the popup to the hidden position initially
        popupTransform.anchoredPosition = m_HiddenPosition;

        // Ensure the state is set to Hidden initially
        popupState = PopupState.Hidden;
    }

    public void ShowPopup(string text)
    {
        if (popupState == PopupState.Hidden)
        {
            // Set the text of the popup
            contentText.text = text;
            // Update the state to Animating
            popupState = PopupState.Animating;
            
            // Slide in to the initial position
            popupTransform.DOAnchorPos(m_InitialPosition, SlideDuration).SetEase(Ease.OutCubic).OnComplete(() =>
            {
                // Update the state to Visible after the animation completes
                popupState = PopupState.Visible;

                // Wait for the stay duration and then slide back out
                DOVirtual.DelayedCall(StayDuration, () =>
                {
                    HidePopup();
                });
            });
        }
    }

    public void HidePopup()
    {
        if (popupState == PopupState.Visible)
        {
            // Update the state to Animating
            popupState = PopupState.Animating;

            // Slide out to the hidden position
            popupTransform.DOAnchorPos(m_HiddenPosition, SlideDuration).SetEase(Ease.InCubic).OnComplete(() =>
            {
                // Update the state to Hidden after the animation completes
                popupState = PopupState.Hidden;
            });
        }
    }

    public void OnSocketMessageReceived(string messageHeader)
    {
        ShowPopup(messageHeader);
    }

    public void RemoveListener()
    {
        SocketController.Instance.RemoveListener(this);
    }

    private void OnDestroy()
    {
        RemoveListener();
    }
}
