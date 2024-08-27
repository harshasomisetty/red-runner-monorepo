using UnityEngine;
using DG.Tweening;

public class SplashManager : MonoBehaviour
{
    public GameObject SplashCanvas;
    public Transform BG;
    public Transform title, GameShiftTitle,SalvayTitle;
    public Transform LogInPanel;
    public Animator titleAnim;
     
    public  void StartTitle()
    {
        title.DOLocalJump(Vector3.zero, 150f, 6, 5, true).OnComplete(delegate {
            title.DOLocalRotate(Vector3.zero, 1, RotateMode.FastBeyond360).SetEase(Ease.OutBounce).OnComplete(delegate {
                titleAnim.enabled = true;
                GameShiftTitle.DOLocalMoveX(0, 1).SetEase(Ease.InOutFlash).SetDelay(0.5f).OnComplete(delegate
                {
                    SalvayTitle.DOLocalMoveX(0, 1).SetEase(Ease.InOutFlash).SetDelay(0.5f).OnComplete(delegate
                    {
                        titleAnim.enabled = true;
                        BG.DOLocalMoveX(2000, 1).SetEase(Ease.InOutFlash).SetDelay(2f).OnStart(delegate {

                            BG.DOScale(0.8f, 1);

                        }).OnComplete(delegate
                        {
                            LogInPanel.DOScale(1f, 1).SetEase((Ease)Ease.OutBounce);
                            SplashCanvas.SetActive(false);
                        });
                    });
                });
            });
        });
    }
}
